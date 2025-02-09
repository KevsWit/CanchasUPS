import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">Política de Privacidad</h1>

      <p>
        En la <strong>Universidad Politécnica Salesiana</strong> nos preocupamos por la privacidad y seguridad de la información de nuestros usuarios.
        Esta política describe cómo recopilamos, utilizamos y protegemos los datos personales de quienes utilizan nuestro sistema de reservas de la cancha de fútbol del Campus Sur.
      </p>

      <h2>1. Información que recopilamos</h2>
      <p>
        Recopilamos datos personales proporcionados por los usuarios al realizar una reserva, incluyendo:
      </p>
      <ul>
        <li>📌 Nombre y apellido</li>
        <li>📧 Correo electrónico institucional</li>
        <li>📅 Fecha y hora de la reserva</li>
        <li>🎓 Carrera y curso</li>
        <li>📄 Razón de la reserva</li>
      </ul>

      <h2>2. Uso de la información</h2>
      <p>
        Utilizamos los datos recopilados para:
      </p>
      <ul>
        <li>✅ Gestionar y confirmar las reservas</li>
        <li>✅ Garantizar el uso adecuado de las instalaciones</li>
        <li>✅ Enviar notificaciones relacionadas con la reserva</li>
        <li>✅ Cumplir con normativas internas de seguridad</li>
      </ul>

      <h2>3. Protección de datos</h2>
      <p>
        Implementamos medidas de seguridad para proteger la información de los usuarios, incluyendo:
      </p>
      <ul>
        <li>🔐 Cifrado de datos sensibles utilizando algoritmos de seguridad</li>
        <li>🔍 Monitoreo y auditoría de accesos</li>
        <li>🚀 Protección contra inyecciones de código y ataques maliciosos</li>
      </ul>

      <h2>4. Compartición de datos</h2>
      <p>
        No compartimos la información personal con terceros, salvo en casos requeridos por normativas legales o cuando sea estrictamente necesario para el funcionamiento del sistema.
      </p>

      <h2>5. Derechos del usuario</h2>
      <p>
        Los usuarios tienen derecho a:
      </p>
      <ul>
        <li>📑 Acceder a sus datos personales</li>
        <li>✏️ Solicitar la corrección de datos incorrectos</li>
        <li>❌ Solicitar la eliminación de su información cuando sea aplicable</li>
      </ul>

      <h2>6. Cookies y tecnologías similares</h2>
      <p>
        Nuestro sistema no utiliza cookies para recopilar información personal, pero puede utilizar herramientas de análisis de tráfico web para mejorar la experiencia del usuario.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Para cualquier consulta relacionada con esta Política de Privacidad, puede contactarnos a través de:
      </p>
      <ul>
        <li>📧 Correo: csalcan&#64;est.ups.edu.ec</li>
        <li>📞 Teléfono: +593 98 866 7013</li>
      </ul>
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
    h1, h2 {
      color: #0056b3;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    ul li {
      margin-bottom: 5px;
    }
  `]
})
export class PrivacyComponent {
  currentYear: number = new Date().getFullYear();
}
