const express = require('express');
const router = express.Router();
const { ClienteController } = require('../controllers/indexController');
const { validarCliente } = require('../middlewares/validaciones');

const clienteController = new ClienteController();

router.get('/', clienteController.getAllClientes);
router.get('/:id', clienteController.getClienteById);
router.post('/', validarCliente, clienteController.createCliente);
router.put('/:id', validarCliente, clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);
router.get('/:id/ordenes', clienteController.getClienteOrdenes);

module.exports = router;
