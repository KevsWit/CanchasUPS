const Reserva = require('../models/reserva');
const reservaController = {};

// Crear una reserva
reservaController.createReserva = async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
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
