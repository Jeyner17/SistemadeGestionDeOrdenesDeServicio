// src/config/database.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'usuario',
    password: process.env.DB_PASSWORD || 'contraseña',
    database: process.env.DB_NAME || 'gestion_servicio',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: console.log,
    define: {
      timestamps: true,
      underscored: false
    }
  },
  test: {
    username: process.env.DB_USER || 'usuario',
    password: process.env.DB_PASSWORD || 'contraseña',
    database: process.env.DB_NAME_TEST || 'gestion_servicio_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: false
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: false
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};