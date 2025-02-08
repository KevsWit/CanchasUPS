import { Component, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatNativeDateModule, MatCardModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

  @ViewChild('scrollContainer') scrollContainer: any;
  @ViewChild('scheduleTable') scheduleTable: any;

  selectedDate: Date | null = null; // Fecha seleccionada en el calendario
  selectedTime: string | null = null; // Horario seleccionado
  availableTimes: string[] = []; // Horarios disponibles

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

  // Método para seleccionar un horario
  selectTime(time: string): void {
    this.selectedTime = time; // Actualiza el horario seleccionado
  }
}