import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="container mt-4">
      <div class="p-4 border rounded shadow bg-white">
        <h1 class="text-center mb-4">📜 Términos y Condiciones</h1>

        <p>
          Bienvenido al sistema de reservas de canchas de la <strong>Universidad Politécnica Salesiana</strong>. 
          Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso.
        </p>

        <hr>

        <h3>📌 1. Uso del Sistema</h3>
        <p>
          Este sistema está destinado exclusivamente para los estudiantes, docentes y personal administrativo de la universidad. 
          El mal uso del sistema puede conllevar sanciones y restricciones de acceso.
        </p>

        <h3>🔐 2. Protección de Datos</h3>
        <p>
          La información personal proporcionada será protegida conforme a nuestra
          <a routerLink="/privacy" class="text-primary fw-bold">Política de Privacidad</a>. 
          No compartimos ni vendemos datos personales a terceros.
        </p>

        <h3>⚠️ 3. Responsabilidades del Usuario</h3>
        <ul>
          <li>El usuario debe proporcionar información veraz y mantener sus datos actualizados.</li>
          <li>Se prohíbe la reserva de horarios en nombre de terceros sin autorización.</li>
          <li>El incumplimiento de las normas puede resultar en la suspensión del acceso al sistema.</li>
        </ul>

        <h3>📅 4. Modificaciones en las Reservas</h3>
        <p>
          La universidad se reserva el derecho de modificar, suspender o cancelar reservas por motivos operativos, 
          como mantenimiento de la cancha o eventos institucionales.
        </p>

        <h3>⚖️ 5. Aceptación de los Términos</h3>
        <p>
          Al continuar utilizando este sistema, aceptas los términos aquí expuestos. 
          Para más información, puedes contactarnos a través de nuestra 
          <a routerLink="/contact" class="text-primary fw-bold">página de contacto</a>.
        </p>

        <p class="text-center mt-4 fw-bold">📌 Última actualización: Febrero 2025</p>
      </div>
    </div>
  `,
  styles: []
})
export class TermsComponent {}
