const mongoose = require('mongoose');
const { MONGO_URI } = require('./config'); // Importar configuración

// Configurar Promesas de Mongoose
mongoose.Promise = global.Promise;

// Conectar a la base de datos
async function conectarDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB conectado a: ${MONGO_URI}`);
    } catch (error) {
        console.error('❌ Error al conectar MongoDB:', error);
        process.exit(1); // Detiene la aplicación si la conexión falla
    }
}

// Exportamos la función para conectarnos a la base de datos
module.exports = conectarDB;
