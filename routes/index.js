const express = require('express');
const router = express.Router();
const clienteRoutes = require('./clienteRoutes');
const ordenServicioRoutes = require('./ordenServicioRoutes');
const tecnicoRoutes = require('./tecnicoRoutes');
const ordenTecnicoRoutes = require('./ordenTecnicoRoutes');

router.use('/clientes', clienteRoutes);
router.use('/ordenes', ordenServicioRoutes);
router.use('/tecnicos', tecnicoRoutes);
router.use('/asignaciones', ordenTecnicoRoutes);

module.exports = router;