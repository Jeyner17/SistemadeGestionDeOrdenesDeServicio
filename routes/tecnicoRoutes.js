const express = require('express');
const router = express.Router();
const { TecnicoController } = require('../controllers/indexController');
const { validarTecnico } = require('../middlewares/validaciones');

const tecnicoController = new TecnicoController();

router.get('/', tecnicoController.getAllTecnicos);
router.get('/:id', tecnicoController.getTecnicoById);
router.post('/', validarTecnico, tecnicoController.createTecnico);
router.put('/:id', validarTecnico, tecnicoController.updateTecnico);
router.delete('/:id', tecnicoController.deleteTecnico);
router.get('/:id/ordenes', tecnicoController.getTecnicoOrdenes);
router.get('/especialidad/:especialidad', tecnicoController.getTecnicosByEspecialidad);

module.exports = router;