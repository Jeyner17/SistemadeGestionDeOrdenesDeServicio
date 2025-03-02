// src/middlewares/validaciones.js
const Joi = require('joi');

// Validación para Cliente
const validarCliente = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.empty': 'El nombre es obligatorio',
      'any.required': 'El nombre es obligatorio'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'El email no es válido',
      'string.empty': 'El email es obligatorio',
      'any.required': 'El email es obligatorio'
    }),
    telefono: Joi.string().min(7).required().messages({
      'string.min': 'El teléfono debe tener al menos 7 caracteres',
      'string.empty': 'El teléfono es obligatorio',
      'any.required': 'El teléfono es obligatorio'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

// Validación para Orden de Servicio
const validarOrden = (req, res, next) => {
  const schema = Joi.object({
    fecha: Joi.date().iso().required().messages({
      'date.base': 'La fecha debe ser una fecha válida',
      'date.format': 'La fecha debe tener formato ISO',
      'any.required': 'La fecha es obligatoria'
    }),
    estado: Joi.string().valid('Pendiente', 'En Proceso', 'Completada', 'Cancelada').required().messages({
      'string.empty': 'El estado es obligatorio',
      'any.required': 'El estado es obligatorio',
      'any.only': 'El estado debe ser uno de los siguientes: Pendiente, En Proceso, Completada, Cancelada'
    }),
    clienteId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del cliente debe ser un número',
      'number.integer': 'El ID del cliente debe ser un número entero',
      'number.positive': 'El ID del cliente debe ser positivo',
      'any.required': 'El ID del cliente es obligatorio'
    }),
    descripcion: Joi.string().allow('', null),
    prioridad: Joi.string().valid('Baja', 'Media', 'Alta').allow('', null)
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

// Validación para Técnico
const validarTecnico = (req, res, next) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required().messages({
      'string.min': 'El nombre debe tener al menos 3 caracteres',
      'string.empty': 'El nombre es obligatorio',
      'any.required': 'El nombre es obligatorio'
    }),
    especialidad: Joi.string().min(2).required().messages({
      'string.min': 'La especialidad debe tener al menos 2 caracteres',
      'string.empty': 'La especialidad es obligatoria',
      'any.required': 'La especialidad es obligatoria'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

// Validación para asignación Orden-Técnico
const validarOrdenTecnico = (req, res, next) => {
  const schema = Joi.object({
    ordenId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID de la orden debe ser un número',
      'number.integer': 'El ID de la orden debe ser un número entero',
      'number.positive': 'El ID de la orden debe ser positivo',
      'any.required': 'El ID de la orden es obligatorio'
    }),
    tecnicoId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del técnico debe ser un número',
      'number.integer': 'El ID del técnico debe ser un número entero',
      'number.positive': 'El ID del técnico debe ser positivo',
      'any.required': 'El ID del técnico es obligatorio'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = {
  validarCliente,
  validarOrden,
  validarTecnico,
  validarOrdenTecnico
};