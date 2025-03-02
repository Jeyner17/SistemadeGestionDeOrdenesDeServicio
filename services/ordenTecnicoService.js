const { OrdenTecnico, OrdenServicio, Tecnico } = require('../models');

class OrdenTecnicoService {
  async getAll() {
    return await OrdenTecnico.findAll({
      include: [
        { model: OrdenServicio },
        { model: Tecnico }
      ]
    });
  }

  async getById(ordenId, tecnicoId) {
    return await OrdenTecnico.findOne({
      where: { ordenId, tecnicoId },
      include: [
        { model: OrdenServicio },
        { model: Tecnico }
      ]
    });
  }

  async create(ordenId, tecnicoId) {
    // Verificar que existan tanto la orden como el técnico
    const orden = await OrdenServicio.findByPk(ordenId);
    const tecnico = await Tecnico.findByPk(tecnicoId);
    
    if (!orden || !tecnico) {
      throw new Error('Orden o técnico no encontrado');
    }
    
    // Verificar si ya existe la asignación
    const existeAsignacion = await OrdenTecnico.findOne({
      where: { ordenId, tecnicoId }
    });
    
    if (existeAsignacion) {
      return existeAsignacion;
    }
    
    return await OrdenTecnico.create({ ordenId, tecnicoId });
  }

  async delete(ordenId, tecnicoId) {
    const asignacion = await OrdenTecnico.findOne({
      where: { ordenId, tecnicoId }
    });
    
    if (!asignacion) return null;
    
    await asignacion.destroy();
    return true;
  }
}

module.exports = OrdenTecnicoService;