// models/evento.js (ajustado para coincidir con las migraciones)
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      Evento.hasMany(models.Reserva, { 
        foreignKey: 'eventoId', 
        as: 'reservas',
        onDelete: 'CASCADE' 
      });
    }
  }
  Evento.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Evento',
    timestamps: true,
  });
  return Evento;
};