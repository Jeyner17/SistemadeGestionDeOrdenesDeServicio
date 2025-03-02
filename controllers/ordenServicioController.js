const OrdenServicioService = require('../services/ordenServicioService');
const ordenServicioService = new OrdenServicioService();

class OrdenServicioController {
  async getAllOrdenes(req, res) {
    try {
      const ordenes = await ordenServicioService.getAll();
      return res.status(200).json(ordenes);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener órdenes', error: error.message });
    }
  }

  async getOrdenById(req, res) {
    try {
      const { id } = req.params;
      const orden = await ordenServicioService.getById(id);
      
      if (!orden) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      
      return res.status(200).json(orden);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener orden', error: error.message });
    }
  }

  async createOrden(req, res) {
    try {
      const nuevaOrden = await ordenServicioService.create(req.body);
      return res.status(201).json(nuevaOrden);
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear orden', error: error.message });
    }
  }

  async updateOrden(req, res) {
    try {
      const { id } = req.params;
      const orden = await ordenServicioService.update(id, req.body);
      
      if (!orden) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      
      return res.status(200).json(orden);
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar orden', error: error.message });
    }
  }

  async deleteOrden(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ordenServicioService.delete(id);
      
      if (!resultado) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      
      return res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar orden', error: error.message });
    }
  }

  async getOrdenTecnicos(req, res) {
    try {
      const { id } = req.params;
      const tecnicos = await ordenServicioService.getTecnicosByOrdenId(id);
      
      if (!tecnicos) {
        return res.status(404).json({ message: 'Orden no encontrada o sin técnicos asignados' });
      }
      
      return res.status(200).json(tecnicos);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener técnicos de la orden', error: error.message });
    }
  }

  async asignarTecnico(req, res) {
    try {
      const { ordenId, tecnicoId } = req.params;
      const resultado = await ordenServicioService.asignarTecnico(ordenId, tecnicoId);
      
      return res.status(200).json({ message: 'Técnico asignado correctamente', data: resultado });
    } catch (error) {
      return res.status(500).json({ message: 'Error al asignar técnico', error: error.message });
    }
  }

  async removerTecnico(req, res) {
    try {
      const { ordenId, tecnicoId } = req.params;
      const resultado = await ordenServicioService.removerTecnico(ordenId, tecnicoId);
      
      if (!resultado) {
        return res.status(404).json({ message: 'Asignación no encontrada' });
      }
      
      return res.status(200).json({ message: 'Técnico removido correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al remover técnico', error: error.message });
    }
  }

  async getOrdenesByEstado(req, res) {
    try {
      const { estado } = req.params;
      const ordenes = await ordenServicioService.getByEstado(estado);
      
      return res.status(200).json(ordenes);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener órdenes por estado', error: error.message });
    }
  }
}

module.exports = OrdenServicioController;
