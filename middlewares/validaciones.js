// src/middlewares/validaciones.js
const Joi = require('joi');

// Validación para Evento
const validarEvento = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required(),
    descripcion: Joi.string().min(10).required(),
    fecha: Joi.date().iso().required(),
    capacidad: Joi.number().integer().positive().required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};

// Validación para Reserva
const validarReserva = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    numero_tickets: Joi.number().integer().positive().required(), // Corregido de numero_tikes a numero_tickets
    eventoId: Joi.number().integer().required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  // Validación adicional para asegurar que no exceda la capacidad del evento
  const { eventoId, numero_tickets } = req.body;
  
  if (req.method === 'POST') {
    const { Evento, Reserva } = require('../models');
    
    Evento.findByPk(eventoId)
      .then(evento => {
        if (!evento) {
          return res.status(404).json({ message: 'Evento no encontrado' });
        }
        
        return Reserva.sum('numero_tickets', { where: { eventoId } })
          .then(total => {
            if (total + numero_tickets > evento.capacidad) {
              return res.status(400).json({ 
                message: 'No hay suficiente capacidad disponible', 
                disponible: evento.capacidad - total,
                solicitado: numero_tickets
              });
            }
            next();
          });
      })
      .catch(err => {
        return res.status(500).json({ message: 'Error al verificar la capacidad', error: err.message });
      });
  } else {
    next();
  }
};

module.exports = {
  validarEvento, 
  validarReserva 
};