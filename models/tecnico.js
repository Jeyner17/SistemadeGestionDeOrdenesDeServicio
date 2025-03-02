'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tecnico extends Model {
    static associate(models) {
      Tecnico.belongsToMany(models.OrdenServicio, { through: 'OrdenTecnico', foreignKey: 'tecnicoId' });
    }
  }

  Tecnico.init({
    nombre: DataTypes.STRING,
    especialidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tecnico',
  });

  return Tecnico;
};
