// models/reserva.js (ajustado para coincidir con las migraciones)
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Evento, { 
        foreignKey: 'eventoId',
        as: 'evento'
      });
    }
  }
  Reserva.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    numero_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Eventos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Reserva',
    timestamps: true
  });
  return Reserva;
};