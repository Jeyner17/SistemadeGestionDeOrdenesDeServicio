const express = require('express');
const router = express.Router();

const eventoRoutes = require('./eventoRoutes');
const reservaRoutes = require('./reservaRoutes');

router.use('/eventos', eventoRoutes);
router.use('/reservas', reservaRoutes);

module.exports = router;