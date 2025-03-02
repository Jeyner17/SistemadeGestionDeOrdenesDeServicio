'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Definir las relaciones manualmente
db.Cliente.hasMany(db.OrdenServicio, { foreignKey: 'clienteId', onDelete: 'CASCADE' });
db.OrdenServicio.belongsTo(db.Cliente, { foreignKey: 'clienteId' });

db.OrdenServicio.belongsToMany(db.Tecnico, { through: db.OrdenTecnico, foreignKey: 'ordenId' });
db.Tecnico.belongsToMany(db.OrdenServicio, { through: db.OrdenTecnico, foreignKey: 'tecnicoId' });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
