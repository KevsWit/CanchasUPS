import { Component, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatCardModule, HttpClientModule, FormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

  constructor(private http: HttpClient) {}

  @ViewChild('scrollContainer') scrollContainer: any;
  @ViewChild('scheduleTable') scheduleTable: any;

  selectedDate: Date | null = null; // Fecha seleccionada en el calendario
  selectedTime: string | null = null; // Horario seleccionado
  availableTimes: string[] = []; // Horarios disponibles
  reservedTimes: string[] = []; // Horarios ya reservados en la fecha seleccionada

  validCedula: boolean | null = null; // Indica si la cédula es válida o no
  cedulaYaReservo: boolean = false; // Indica si la cédula ya hizo una reserva
  
  reserva = {
    cedula: '',
    nombre: '',
    correo: '',
    curso: '',
    carrera: '',
    razon: '',
    fecha: '',
    hora: ''
  };

  // Método para enviar la reserva al backend
  crearReserva(): void {
    if (!this.reserva.cedula || !this.reserva.nombre || !this.reserva.correo || !this.reserva.curso || !this.reserva.carrera || !this.reserva.razon || !this.reserva.fecha || !this.reserva.hora) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    this.http.post('https://4df9-200-63-104-90.ngrok-free.app/api/reservas/crear', this.reserva)
      .subscribe(response => {
        alert('Reserva creada con éxito');
        this.resetForm();
      }, error => {
        alert('Error al crear la reserva');
        console.error(error);
      });
  }

  // Método para limpiar el formulario después de hacer una reserva
  resetForm(): void {
    this.reserva = {
      cedula: '',
      nombre: '',
      correo: '',
      curso: '',
      carrera: '',
      razon: '',
      fecha: '',
      hora: ''
    };
    this.selectedTime = null;
  }

  scrollToScheduleTable(): void {
    if (this.scheduleTable) {
      this.scheduleTable.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Método llamado al seleccionar una fecha
  onDateChange(date: Date): void {
    this.selectedDate = date; // Actualiza la fecha seleccionada
    this.generateAvailableTimes(); // Genera los horarios para la fecha
    this.selectedTime = null; // Reinicia la selección de horario

    if (this.reserva.cedula) {
      this.verificarReservaExistente(this.reserva.cedula, date);
    }

    this.obtenerReservasDelDia(date);

    setTimeout(() => {
      this.scrollToScheduleTable();
    }, 0);
  }

  // Genera una lista de horarios disponibles
  generateAvailableTimes(): void {
    const startHour = 7; // Hora de inicio (7:00 AM)
    const endHour = 21; // Hora de fin (9:00 PM)
    const interval = 1; // Intervalo entre horarios (1 hora)

    this.availableTimes = [];
    for (let hour = startHour; hour < endHour; hour += interval) {
      const timeSlot = `${this.formatHour(hour)} - ${this.formatHour(hour + interval)}`;
      this.availableTimes.push(timeSlot);
    }
  }

  // Da formato a las horas para mostrarlas como AM/PM
  formatHour(hour: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:00 ${period}`;
  }

  // Obtiene las reservas del backend para la fecha seleccionada
  obtenerReservasDelDia(fecha: Date): void {
    const fechaStr = fecha.toISOString().split('T')[0];

    this.http.get<any[]>('https://4df9-200-63-104-90.ngrok-free.app/api/reservas/listar').subscribe(reservas => {
      this.reservedTimes = reservas
        .filter(reserva => reserva.fecha.split('T')[0] === fechaStr)
        .map(reserva => reserva.hora);
    });
  }

  // Método para seleccionar un horario
  selectTime(time: string): void {
    if (this.reservedTimes.includes(time)) {
      return; // Evita que el usuario seleccione una hora reservada
    }

    this.selectedTime = time; // Actualiza el horario seleccionado

    // Actualiza los valores de la reserva
    if (this.selectedDate) {
      this.reserva.fecha = this.selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      this.reserva.hora = time;
      this.verificarReservaExistente(this.reserva.cedula, this.selectedDate);
    }
  }


  // Método para validar la cédula ecuatoriana
  validarCedula(cedula: string): void {
    if (cedula.length !== 10 || isNaN(Number(cedula))) {
      this.validCedula = false;
      return;
    }

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]; // Coeficientes para la validación
    const provincia = parseInt(cedula.substring(0, 2), 10);
    const digitoVerificador = parseInt(cedula[9], 10);
    let suma = 0;

    if (provincia < 1 || provincia > 24) {
      this.validCedula = false;
      return;
    }

    for (let i = 0; i < 9; i++) {
      let valor = parseInt(cedula[i], 10) * coeficientes[i];
      if (valor >= 10) {
        valor -= 9;
      }
      suma += valor;
    }

    const residuo = suma % 10;
    const resultado = residuo === 0 ? 0 : 10 - residuo;

    this.validCedula = resultado === digitoVerificador;

    if (this.validCedula && this.selectedDate) {
      this.verificarReservaExistente(cedula, this.selectedDate);
    }
  }

  // Verificar si la cédula ya tiene una reserva en la misma fecha
  verificarReservaExistente(cedula: string, fecha: Date): void {
    const fechaStr = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    this.http.get<any[]>('https://4df9-200-63-104-90.ngrok-free.app/api/reservas/listar').subscribe(reservas => {
      this.cedulaYaReservo = reservas.some(reserva =>
        reserva.cedula === cedula && reserva.fecha.split('T')[0] === fechaStr
      );
    });
  }
}