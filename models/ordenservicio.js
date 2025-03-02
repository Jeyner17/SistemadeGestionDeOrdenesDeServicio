'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdenServicio extends Model {
    static associate(models) {
      // Relación con Cliente (muchos a uno)
      OrdenServicio.belongsTo(models.Cliente, { foreignKey: 'clienteId', onDelete: 'CASCADE' });

      // Relación con Técnico (muchos a muchos)
      OrdenServicio.belongsToMany(models.Tecnico, { through: 'OrdenTecnico', foreignKey: 'ordenId' });
    }
  }

  OrdenServicio.init({
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrdenServicio',
  });

  return OrdenServicio;
};
