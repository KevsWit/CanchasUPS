import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  horarios: string[] = [];
  reservas: any[] = [];
  semana: Date[] = [];
  calendario: { [hora: string]: { [dia: number]: boolean } } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.generarHorarios();
    this.generarSemana();
    this.obtenerReservas();
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

  // Formato de hora (AM/PM)
  formatHour(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  // Genera los días de la semana actual
  generarSemana(): void {
    const hoy = new Date();
    const lunes = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1)); // Lunes de la semana actual

    this.semana = [];
    for (let i = 0; i < 7; i++) {
      this.semana.push(new Date(lunes.getTime() + i * 24 * 60 * 60 * 1000));
    }
  }

  // Obtiene las reservas del backend
  obtenerReservas(): void {
    this.http.get<any[]>('http://localhost:3773/api/reservas/listar').subscribe(reservas => {
      this.reservas = reservas;
      this.organizarReservas();
    });
  }

  // Organiza las reservas en la estructura de la tabla
  organizarReservas(): void {
    this.calendario = {};

    // Inicializa la estructura de la tabla
    this.horarios.forEach(hora => {
      this.calendario[hora] = { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };
    });

    // Llena los horarios reservados en la estructura
    this.reservas.forEach(reserva => {
      const fechaReserva = new Date(reserva.fecha);
      const diaSemana = fechaReserva.getDay(); // 0 (Dom) - 6 (Sáb)
      const horaReserva = reserva.hora; // Ej: "08:00 - 09:00"

      if (this.calendario[horaReserva]) {
        this.calendario[horaReserva][diaSemana] = true; // Marcar como reservado
      }
    });
  }
}
