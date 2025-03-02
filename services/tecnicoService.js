const { Tecnico, OrdenServicio } = require('../models');

class TecnicoService {
  async getAll() {
    return await Tecnico.findAll();
  }

  async getById(id) {
    return await Tecnico.findByPk(id);
  }

  async create(data) {
    return await Tecnico.create(data);
  }

  async update(id, data) {
    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) return null;
    
    await tecnico.update(data);
    return tecnico;
  }

  async delete(id) {
    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) return null;
    
    await tecnico.destroy();
    return true;
  }

  async getOrdenesByTecnicoId(id) {
    const tecnico = await Tecnico.findByPk(id, {
      include: [{
        model: OrdenServicio,
        through: { attributes: [] }
      }]
    });
    
    if (!tecnico) return null;
    return tecnico.OrdenServicios;
  }

  async getByEspecialidad(especialidad) {
    return await Tecnico.findAll({
      where: { especialidad }
    });
  }
}

module.exports = TecnicoService;