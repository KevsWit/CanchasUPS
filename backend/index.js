const express = require('express');
const cors = require('cors');
const conectarDB = require('./database'); // Importamos la conexión a la BD
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PORT } = require('./config'); // Importar configuración

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos de timeout
    max: 100, // Máximo de 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde'
});



// Aplicar el límite de peticiones a todas las rutas


const app = express();

// Middlewares
app.use(express.json());
// Habilitar CORS para permitir peticiones desde el frontend en Ngrok
app.use(cors({
    origin: '*', // Permitir todas las solicitudes (puedes cambiarlo a la URL de Ngrok si quieres restringir)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(limiter);

// ** Middleware para evitar la advertencia de Ngrok **
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// Rutas
app.use('/api/reservas', require('./routes/reserva.routes'));

async function iniciarServidor() {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo 🚀`);
    });
}

iniciarServidor();
