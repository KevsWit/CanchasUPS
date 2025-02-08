const mongoose = require('mongoose');

// Configurar Promesas de Mongoose
mongoose.Promise = global.Promise;

// Conectar a la base de datos
async function conectarDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/canchasUPS', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectado a la base canchasUPS');
    } catch (error) {
        console.error('Error al conectar MongoDB:', error);
        process.exit(1); // Detiene la aplicación si la conexión falla
    }
}

// Exportamos la función para conectarnos a la base de datos
module.exports = conectarDB;
