const TecnicoService = require('../services/tecnicoService');
const tecnicoService = new TecnicoService();

class TecnicoController {
  async getAllTecnicos(req, res) {
    try {
      const tecnicos = await tecnicoService.getAll();
      return res.status(200).json(tecnicos);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener técnicos', error: error.message });
    }
  }

  async getTecnicoById(req, res) {
    try {
      const { id } = req.params;
      const tecnico = await tecnicoService.getById(id);
      
      if (!tecnico) {
        return res.status(404).json({ message: 'Técnico no encontrado' });
      }
      
      return res.status(200).json(tecnico);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener técnico', error: error.message });
    }
  }

  async createTecnico(req, res) {
    try {
      const nuevoTecnico = await tecnicoService.create(req.body);
      return res.status(201).json(nuevoTecnico);
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear técnico', error: error.message });
    }
  }

  async updateTecnico(req, res) {
    try {
      const { id } = req.params;
      const tecnico = await tecnicoService.update(id, req.body);
      
      if (!tecnico) {
        return res.status(404).json({ message: 'Técnico no encontrado' });
      }
      
      return res.status(200).json(tecnico);
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar técnico', error: error.message });
    }
  }

  async deleteTecnico(req, res) {
    try {
      const { id } = req.params;
      const resultado = await tecnicoService.delete(id);
      
      if (!resultado) {
        return res.status(404).json({ message: 'Técnico no encontrado' });
      }
      
      return res.status(200).json({ message: 'Técnico eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar técnico', error: error.message });
    }
  }

  async getTecnicoOrdenes(req, res) {
    try {
      const { id } = req.params;
      const ordenes = await tecnicoService.getOrdenesByTecnicoId(id);
      
      if (!ordenes) {
        return res.status(404).json({ message: 'Técnico no encontrado o sin órdenes asignadas' });
      }
      
      return res.status(200).json(ordenes);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener órdenes del técnico', error: error.message });
    }
  }

  async getTecnicosByEspecialidad(req, res) {
    try {
      const { especialidad } = req.params;
      const tecnicos = await tecnicoService.getByEspecialidad(especialidad);
      
      return res.status(200).json(tecnicos);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener técnicos por especialidad', error: error.message });
    }
  }
}

module.exports = TecnicoController;