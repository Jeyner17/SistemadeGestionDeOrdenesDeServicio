const EventoService = require('../services/eventoService');

class EventoController {
  async getAllEventos(req, res) {
    try {
      const eventos = await EventoService.getAll();
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
    }
  }

  async getEventoById(req, res) {
    try {
      const evento = await EventoService.getById(req.params.id);
      if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
      res.json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el evento', error: error.message });
    }
  }

  async createEvento(req, res) {
    try {
      const evento = await EventoService.create(req.body);
      res.status(201).json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el evento', error: error.message });
    }
  }

  async updateEvento(req, res) {
    try {
      const evento = await EventoService.update(req.params.id, req.body);
      if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
      res.json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el evento', error: error.message });
    }
  }

  async deleteEvento(req, res) {
    try {
      const eventoEliminado = await EventoService.delete(req.params.id);
      if (!eventoEliminado) return res.status(404).json({ message: 'Evento no encontrado' });
      res.json({ message: 'Evento eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
    }
  }
}

module.exports = EventoController;