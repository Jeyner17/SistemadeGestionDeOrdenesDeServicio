const express = require('express');
const router = express.Router();
const { OrdenTecnicoController } = require('../controllers/indexController');
const { validarOrdenTecnico } = require('../middlewares/validaciones');

const ordenTecnicoController = new OrdenTecnicoController();

router.get('/', ordenTecnicoController.getAllAsignaciones);
router.get('/:ordenId/:tecnicoId', ordenTecnicoController.getAsignacionById);
router.post('/', validarOrdenTecnico, ordenTecnicoController.createAsignacion);
router.delete('/:ordenId/:tecnicoId', ordenTecnicoController.deleteAsignacion);

module.exports = router;