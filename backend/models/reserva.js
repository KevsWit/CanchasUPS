const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const { Schema } = mongoose;

const SECRET_KEY = 'clave_secreta_super_segura'; // Usa una clave fuerte y almacénala en variables de entorno.

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

// Hashear la cédula antes de guardar
ReservaSchema.pre('save', async function (next) {
  if (this.isModified('cedula')) {
    const salt = await bcrypt.genSalt(10);
    this.cedula = await bcrypt.hash(this.cedula, salt);
  }

  if (this.isModified('correo')) {
    this.correo = CryptoJS.AES.encrypt(this.correo, SECRET_KEY).toString();
  }

  next();
});

// Método para desencriptar el correo al obtener reservas
ReservaSchema.methods.getDecryptedCorreo = function () {
  const bytes = CryptoJS.AES.decrypt(this.correo, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = mongoose.model('Reserva', ReservaSchema);
