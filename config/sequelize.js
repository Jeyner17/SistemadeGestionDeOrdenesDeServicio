const { Sequelize } = require('sequelize');
const config = require('./database');

// Determinar el entorno de ejecución
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: dbConfig.define,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool
  }
);

module.exports = {
  sequelize,
  Sequelize
};