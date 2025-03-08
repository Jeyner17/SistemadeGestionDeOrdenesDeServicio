const { Evento } = require('../models');

class EventoService {
  async getAll() {
    return await Evento.findAll();
  }

  async getById(id) {
    return await Evento.findByPk(id);
  }

  async create(data) {
    return await Evento.create(data);
  }

  async update(id, data) {
    const evento = await Evento.findByPk(id);
    if (!evento) return null;

    await evento.update(data);
    return evento;
  }

  async delete(id) {
    const evento = await Evento.findByPk(id);
    if (!evento) return null;

    await evento.destroy();
    return true;
  }
}

module.exports = new EventoService();