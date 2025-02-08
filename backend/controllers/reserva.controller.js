const Reserva = require('../models/reserva');
const reservaController = {};
const sanitize = require('mongo-sanitize');

reservaController.createReserva = async (req, res) => {
    try {
        const datosOriginales = req.body;
        const datosLimpios = sanitize(datosOriginales);
        for (const key in datosOriginales) {
            if (typeof datosOriginales[key] === 'object' && datosOriginales[key] !== null) {
                return res.status(400).json({ 
                    error: 'Se detectaron datos inválidos. Verifique su entrada y vuelva a intentarlo.',
                    campo_invalido: key 
                });
            }
        }
        if (
            !datosLimpios.cedula ||
            !datosLimpios.nombre ||
            !datosLimpios.correo ||
            !datosLimpios.curso ||
            !datosLimpios.carrera ||
            !datosLimpios.razon ||
            !datosLimpios.fecha ||
            !datosLimpios.hora
        ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        datosLimpios.fecha = new Date(datosLimpios.fecha);
        const nuevaReserva = new Reserva(datosLimpios);
        await nuevaReserva.save();
        res.json({ status: 'Reserva guardada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la reserva' });
    }
};


// Obtener todas las reservas
reservaController.getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

module.exports = reservaController;
