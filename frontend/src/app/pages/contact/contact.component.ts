import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">📞 Contacto - UPS Sede Quito</h1>

      <div class="contact-box">
        <h4 class="text-center text-primary"><strong>📍 DIRECCIÓN TÉCNICA DE ADMISIONES</strong></h4>
        <p class="text-center"><strong>Fanny Suárez Cobos</strong></p>

        <ul class="list-unstyled text-center">
          <li>📧 <strong>Correo electrónico:</strong> 
            <a href="mailto:admisionesuio@ups.edu.ec">admisionesuio&#64;ups.edu.ec</a>
          <li>📞 <strong>Teléfono:</strong> 
            <a href="tel:+59323962800">(+593) 02 3962800</a> <strong> Ext.:</strong> 2178</li>
          <li>📱 <strong>WhatsApp:</strong> 
            <a href="https://wa.me/0998447486" target="_blank">0998447486</a></li>
        </ul>

        <h4 class="text-center text-primary"><strong>RESPONSABLE DEL SISTEMA</strong></h4>
        <p class="text-center"><strong>Carlos Daniel Salcán Minga</strong></p>
        <ul class="list-unstyled text-center">
          <li>📧 <strong>Correo electrónico:</strong> 
            <a href="mailto:csalcan@est.ups.edu.ec">csalcan&#64;est.ups.edu.ec</a>
        </ul>
      </div>

      <div class="contact-box mt-4">
        <h4 class="text-primary"><strong>📌 Ubicaciones de los Campus</strong></h4>
        <ul class="list-unstyled">
          <li>🏛️ <strong>Campus El Girón:</strong> Av. Isabel La Católica N. 23-52 y Madrid</li>
          <li>⚽ <strong>Campus Sur:</strong> Rumichaca y Morán Valverde s/n</li>
          <li>📍 <strong>Extensión Cayambe:</strong> Av. Natalia Jarrín N.3-85 y 9 de Octubre</li>
        </ul>
      </div>

      <p class="text-center mt-4">
        Puedes visitarnos en cualquiera de nuestras sedes durante el horario de oficina. ¡Estaremos encantados de atenderte!
      </p>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .contact-box {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    h1, h4 {
      color: #0056b3;
    }
    ul {
      padding: 0;
      list-style: none;
    }
    ul li {
      margin-bottom: 10px;
      font-size: 16px;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class ContactComponent {
  currentYear: number = new Date().getFullYear();
}
