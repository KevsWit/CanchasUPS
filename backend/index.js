const express = require('express');
const cors = require('cors');
const conectarDB = require('./database'); // Importamos la conexión a la BD
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PORT } = require('./config'); // Importar configuración

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde'
});

// Aplicar el límite de peticiones a todas las rutas


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

// Rutas
app.use('/api/reservas', require('./routes/reserva.routes'));

async function iniciarServidor() {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo 🚀`);
    });
}

iniciarServidor();
