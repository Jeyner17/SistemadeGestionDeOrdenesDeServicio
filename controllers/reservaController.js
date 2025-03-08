const ReservaService = require('../services/reservaService');

class ReservaController {
  async getAllReservas(req, res) {
    try {
      const reservas = await ReservaService.getAll();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
    }
  }

  async getReservaById(req, res) {
    try {
      const reserva = await ReservaService.getById(req.params.id);
      if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
    }
  }

  async createReserva(req, res) {
    try {
      const reserva = await ReservaService.create(req.body);
      if (!reserva) return res.status(404).json({ message: 'Evento no encontrado' });
      res.status(201).json(reserva);
    } catch (error) {
      if (error.message === 'No hay suficiente capacidad disponible') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
    }
  }

  async updateReserva(req, res) {
    try {
      const reserva = await ReservaService.update(req.params.id, req.body);
      if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
    }
  }

  async deleteReserva(req, res) {
    try {
      const reservaEliminada = await ReservaService.delete(req.params.id);
      if (!reservaEliminada) return res.status(404).json({ message: 'Reserva no encontrada' });
      res.json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la reserva', error: error.message });
    }
  }

  async getReservasPorEvento(req, res) {
    try {
      const reservas = await ReservaService.getReservasPorEvento(req.params.eventoId);
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reservas del evento', error: error.message });
    }
  }
}

module.exports = ReservaController;