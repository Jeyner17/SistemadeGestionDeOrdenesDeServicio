// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', routes);

// Ruta para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de Gestión de Órdenes de Servicio - Funcionando correctamente' });
});

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = app;