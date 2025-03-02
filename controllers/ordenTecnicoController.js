const OrdenTecnicoService = require('../services/ordenTecnicoService');
const ordenTecnicoService = new OrdenTecnicoService();

class OrdenTecnicoController {
  async getAllAsignaciones(req, res) {
    try {
      const asignaciones = await ordenTecnicoService.getAll();
      return res.status(200).json(asignaciones);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener asignaciones', error: error.message });
    }
  }

  async getAsignacionById(req, res) {
    try {
      const { ordenId, tecnicoId } = req.params;
      const asignacion = await ordenTecnicoService.getById(ordenId, tecnicoId);
      
      if (!asignacion) {
        return res.status(404).json({ message: 'Asignación no encontrada' });
      }
      
      return res.status(200).json(asignacion);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener asignación', error: error.message });
    }
  }

  async createAsignacion(req, res) {
    try {
      const { ordenId, tecnicoId } = req.body;
      const nuevaAsignacion = await ordenTecnicoService.create(ordenId, tecnicoId);
      return res.status(201).json(nuevaAsignacion);
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear asignación', error: error.message });
    }
  }

  async deleteAsignacion(req, res) {
    try {
      const { ordenId, tecnicoId } = req.params;
      const resultado = await ordenTecnicoService.delete(ordenId, tecnicoId);
      
      if (!resultado) {
        return res.status(404).json({ message: 'Asignación no encontrada' });
      }
      
      return res.status(200).json({ message: 'Asignación eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar asignación', error: error.message });
    }
  }
}

module.exports = OrdenTecnicoController;