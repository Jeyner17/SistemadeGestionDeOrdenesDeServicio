// src/server.js
require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

// Función para sincronizar la base de datos y arrancar el servidor
async function startServer() {
  try {
    // Verificar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();