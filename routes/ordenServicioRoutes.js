const express = require('express');
const router = express.Router();
const { OrdenServicioController } = require('../controllers/indexController');
const { validarOrden } = require('../middlewares/validaciones');

const ordenServicioController = new OrdenServicioController();

router.get('/', ordenServicioController.getAllOrdenes);
router.get('/:id', ordenServicioController.getOrdenById);
router.post('/', validarOrden, ordenServicioController.createOrden);
router.put('/:id', validarOrden, ordenServicioController.updateOrden);
router.delete('/:id', ordenServicioController.deleteOrden);
router.get('/:id/tecnicos', ordenServicioController.getOrdenTecnicos);
router.post('/:ordenId/tecnicos/:tecnicoId', ordenServicioController.asignarTecnico);
router.delete('/:ordenId/tecnicos/:tecnicoId', ordenServicioController.removerTecnico);
router.get('/estado/:estado', ordenServicioController.getOrdenesByEstado);

module.exports = router;