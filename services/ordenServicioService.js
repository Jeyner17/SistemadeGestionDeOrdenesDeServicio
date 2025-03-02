const { OrdenServicio, Cliente, Tecnico, OrdenTecnico } = require('../models');

class OrdenServicioService {
  async getAll() {
    return await OrdenServicio.findAll({
      include: [{
        model: Cliente,
        attributes: ['id', 'nombre', 'email']
      }, {
        model: Tecnico,
        through: { attributes: [] } // Excluye los atributos de la tabla intermedia
      }]
    });
  }

  async getById(id) {
    return await OrdenServicio.findByPk(id, {
      include: [{
        model: Cliente,
        attributes: ['id', 'nombre', 'email']
      }, {
        model: Tecnico,
        through: { attributes: [] }
      }]
    });
  }

  async create(data) {
    return await OrdenServicio.create(data);
  }

  async update(id, data) {
    const orden = await OrdenServicio.findByPk(id);
    if (!orden) return null;
    
    await orden.update(data);
    return orden;
  }

  async delete(id) {
    const orden = await OrdenServicio.findByPk(id);
    if (!orden) return null;
    
    await orden.destroy();
    return true;
  }

  async getTecnicosByOrdenId(id) {
    const orden = await OrdenServicio.findByPk(id, {
      include: [{
        model: Tecnico,
        through: { attributes: [] }
      }]
    });
    
    if (!orden) return null;
    return orden.Tecnicos;
  }

  async asignarTecnico(ordenId, tecnicoId) {
    const orden = await OrdenServicio.findByPk(ordenId);
    const tecnico = await Tecnico.findByPk(tecnicoId);
    
    if (!orden || !tecnico) {
      throw new Error('Orden o técnico no encontrado');
    }
    
    await orden.addTecnico(tecnico);
    return { ordenId, tecnicoId };
  }

  async removerTecnico(ordenId, tecnicoId) {
    const orden = await OrdenServicio.findByPk(ordenId);
    const tecnico = await Tecnico.findByPk(tecnicoId);
    
    if (!orden || !tecnico) return null;
    
    const result = await orden.removeTecnico(tecnico);
    return result > 0; // Retorna true si se eliminó al menos una relación
  }

  async getByEstado(estado) {
    return await OrdenServicio.findAll({
      where: { estado },
      include: [{
        model: Cliente,
        attributes: ['id', 'nombre', 'email']
      }, {
        model: Tecnico,
        through: { attributes: [] }
      }]
    });
  }
}

module.exports = OrdenServicioService;