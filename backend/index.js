const express = require('express');
const cors = require('cors');
const conectarDB = require('./database');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PORT } = require('./config');

const app = express();

// 🔹 Configurar Express para confiar en proxies como Ngrok
app.set('trust proxy', 1); 

// ✅ Configurar CORS para permitir el header 'ngrok-skip-browser-warning'
app.use(cors({
    origin: '*',  // Permitir todas las solicitudes (ajustar según necesidad)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

// Middleware de seguridad
app.use(express.json());
app.use(helmet());

// 🔹 Configurar express-rate-limit correctamente
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 100, // Máximo de 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP, intenta más tarde.'
});
app.use(limiter);

// ✅ Middleware para evitar la advertencia de Ngrok
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// Rutas
app.use('/api/reservas', require('./routes/reserva.routes'));

// Iniciar servidor
async function iniciarServidor() {
    await conectarDB();
    app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en puerto ${PORT} 🚀`);
    });
}

iniciarServidor();
