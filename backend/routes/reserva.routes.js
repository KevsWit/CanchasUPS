const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

router.post('/crear', reservaController.createReserva);
router.get('/listar', reservaController.getReservas);

module.exports = router;
