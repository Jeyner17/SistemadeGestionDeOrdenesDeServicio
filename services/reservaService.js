// services/reservaService.js
const { Reserva, Evento } = require('../models');
const { Op } = require('sequelize');

class ReservaService {
  async getAll() {
    return await Reserva.findAll({ include: { model: Evento, as: 'evento' } });
  }

  async getById(id) {
    return await Reserva.findByPk(id, { include: { model: Evento, as: 'evento' } });
  }

  async create(data) {
    const evento = await Evento.findByPk(data.eventoId);
    if (!evento) return null;

    const reservasActuales = await Reserva.sum('numero_tickets', {
      where: { eventoId: data.eventoId }
    }) || 0;
    
    if (reservasActuales + data.numero_tickets > evento.capacidad) {
      throw new Error('No hay suficiente capacidad disponible');
    }
    
    return await Reserva.create(data);
  }

  async update(id, data) {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) return null;

    if ((data.numero_tickets && data.numero_tickets !== reserva.numero_tickets) || 
        (data.eventoId && data.eventoId !== reserva.eventoId)) {
      
      const eventoId = data.eventoId || reserva.eventoId;
      const evento = await Evento.findByPk(eventoId);
      if (!evento) throw new Error('Evento no encontrado');
      
      const reservasActuales = await Reserva.sum('numero_tickets', {
        where: { 
          eventoId,
          id: { [Op.ne]: id } 
        }
      }) || 0;
      
      if (reservasActuales + (data.numero_tickets || reserva.numero_tickets) > evento.capacidad) {
        throw new Error('No hay suficiente capacidad disponible');
      }
    }

    await reserva.update(data);
    return reserva;
  }

  async delete(id) {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) return null;

    await reserva.destroy();
    return true;
  }

  async getReservasPorEvento(eventoId) {
    return await Reserva.findAll({
      where: { eventoId },
      include: { model: Evento, as: 'evento' }
    });
  }
}

module.exports = new ReservaService();