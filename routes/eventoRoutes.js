const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');
const { validarEvento } = require('../middlewares/validaciones');

const eventoController = new EventoController();

router.get('/', eventoController.getAllEventos);
router.get('/:id', eventoController.getEventoById);
router.post('/', validarEvento, eventoController.createEvento);
router.put('/:id', validarEvento, eventoController.updateEvento);
router.delete('/:id', eventoController.deleteEvento);

module.exports = router;