const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reservaController');
const { validarReserva } = require('../middlewares/validaciones');

const reservaController = new ReservaController();

router.get('/', reservaController.getAllReservas);
router.get('/evento/:eventoId', reservaController.getReservasPorEvento);
router.get('/:id', reservaController.getReservaById);
router.post('/', validarReserva, reservaController.createReserva);
router.put('/:id', validarReserva, reservaController.updateReserva);
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;