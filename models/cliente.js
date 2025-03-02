'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.OrdenServicio, { foreignKey: 'clienteId', onDelete: 'CASCADE' });
    }
  }

  Cliente.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
  });

  return Cliente;
};
