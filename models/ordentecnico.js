'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdenTecnico extends Model {
    static associate(models) {
      // Relaciones con las tablas principales
      OrdenTecnico.belongsTo(models.OrdenServicio, { foreignKey: 'ordenId', onDelete: 'CASCADE' });
      OrdenTecnico.belongsTo(models.Tecnico, { foreignKey: 'tecnicoId', onDelete: 'CASCADE' });
    }
  }

  OrdenTecnico.init({
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'OrdenServicios', key: 'id' }
    },
    tecnicoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Tecnicos', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'OrdenTecnico',
    timestamps: false 
  });

  return OrdenTecnico;
};
