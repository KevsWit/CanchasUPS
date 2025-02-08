const express = require('express');
const cors = require('cors');
const conectarDB = require('./database'); // Importamos la conexión a la BD

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/reservas', require('./routes/reserva.routes'));

// Iniciar servidor solo si la BD se conecta correctamente
const PORT = process.env.PORT || 3773;
async function iniciarServidor() {
    await conectarDB(); // Esperamos a que la BD se conecte antes de arrancar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

iniciarServidor();
