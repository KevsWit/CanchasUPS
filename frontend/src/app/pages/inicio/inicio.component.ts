import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  horarios: string[] = [];
  reservas: any[] = [];
  semana: Date[] = [];
  calendario: { [hora: string]: { [dia: number]: boolean } } = {};
  fechaBase: Date = new Date(); // Fecha base para calcular la semana mostrada

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.generarHorarios();
    this.generarSemana();
    this.obtenerReservas();
  }

  // Formato de hora (AM/PM)
  formatHour(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  // Método para cambiar de semana (1 = adelante, -1 = atrás)
  cambiarSemana(direccion: number): void {
    this.fechaBase.setDate(this.fechaBase.getDate() + direccion * 7);
    this.fechaBase = new Date(this.fechaBase); // Forzar actualización
    this.generarSemana();
    this.organizarReservas();
  }

  // Genera la semana en función de `fechaBase`
  generarSemana(): void {
    const lunes = new Date(this.fechaBase);
    lunes.setDate(lunes.getDate() - lunes.getDay() + 1); // Ir al lunes de la semana de `fechaBase`

    this.semana = [];
    for (let i = 0; i < 7; i++) {
      this.semana.push(new Date(lunes.getTime() + i * 24 * 60 * 60 * 1000));
    }
  }

  // Genera los horarios de la cancha
  generarHorarios(): void {
    const startHour = 7; // 7:00 AM
    const endHour = 21; // 9:00 PM
    this.horarios = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const horaInicio = `${this.formatHour(hour)}`;
      const horaFin = `${this.formatHour(hour + 1)}`;
      this.horarios.push(`${horaInicio} - ${horaFin}`);
    }
  }

  // Obtiene las reservas del backend
  obtenerReservas(): void {
    this.http.get<any[]>(`${this.apiUrl}/reservas/listar`).subscribe(reservas => {
      this.reservas = reservas;
      this.organizarReservas();
    });
  }

  // Organiza las reservas para que solo se muestren las de la semana seleccionada
  organizarReservas(): void {
    this.calendario = {};

    this.horarios.forEach(hora => {
      this.calendario[hora] = { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
    });

    this.reservas.forEach(reserva => {
      const fechaReserva = new Date(reserva.fecha);
      const diaSemana = fechaReserva.getDay(); // 0 (Dom) - 6 (Sáb)
      const horaReserva = reserva.hora;

      // Verificar si la reserva pertenece a la semana seleccionada
      if (this.semana.some(dia => dia.toISOString().split('T')[0] === fechaReserva.toISOString().split('T')[0])) {
        if (this.calendario[horaReserva]) {
          this.calendario[horaReserva][diaSemana] = true;
        }
      }
    });
  }
}
