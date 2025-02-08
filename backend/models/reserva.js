const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservaSchema = new Schema({
  cedula: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  curso: { type: String, required: true },
  carrera: { type: String, required: true },
  razon: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true } // Puede ser en formato "HH:mm"
});

module.exports = mongoose.model('Reserva', ReservaSchema);
