const ClienteService = require('../services/clienteService');
const clienteService = new ClienteService();

class ClienteController {
  async getAllClientes(req, res) {
    try {
      const clientes = await clienteService.getAll();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
    }
  }

  async getClienteById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.getById(id);
      
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener cliente', error: error.message });
    }
  }

  async createCliente(req, res) {
    try {
      const nuevoCliente = await clienteService.create(req.body);
      return res.status(201).json(nuevoCliente);
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear cliente', error: error.message });
    }
  }

  async updateCliente(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.update(id, req.body);
      
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
    }
  }

  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      const resultado = await clienteService.delete(id);
      
      if (!resultado) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      
      return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
    }
  }

  async getClienteOrdenes(req, res) {
    try {
      const { id } = req.params;
      const ordenes = await clienteService.getOrdenesByClienteId(id);
      
      if (!ordenes) {
        return res.status(404).json({ message: 'Cliente no encontrado o sin órdenes' });
      }
      
      return res.status(200).json(ordenes);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener órdenes del cliente', error: error.message });
    }
  }
}

module.exports = ClienteController;