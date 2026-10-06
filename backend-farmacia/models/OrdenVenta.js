const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenVenta = sequelize.define('OrdenVenta', {
  NroOrdenVta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaEmision: { type: DataTypes.DATEONLY },
  Motivo: { type: DataTypes.STRING },
  Situacion: { type: DataTypes.STRING }
}, { tableName: 'OrdenVenta', timestamps: false });

module.exports = OrdenVenta;