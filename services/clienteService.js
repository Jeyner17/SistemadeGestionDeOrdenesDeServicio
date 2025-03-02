const { Cliente, OrdenServicio } = require('../models');

class ClienteService {
  async getAll() {
    return await Cliente.findAll();
  }

  async getById(id) {
    return await Cliente.findByPk(id);
  }

  async create(data) {
    return await Cliente.create(data);
  }

  async update(id, data) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    
    await cliente.update(data);
    return cliente;
  }

  async delete(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    
    await cliente.destroy();
    return true;
  }

  async getOrdenesByClienteId(id) {
    const cliente = await Cliente.findByPk(id, {
      include: [{
        model: OrdenServicio
      }]
    });
    
    if (!cliente) return null;
    return cliente.OrdenServicios;
  }
}

module.exports = ClienteService;