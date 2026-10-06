const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
  NroOrdenVta: { type: DataTypes.INTEGER, primaryKey: true },
  CodMedicamento: { type: DataTypes.INTEGER, primaryKey: true },
  descripcionMed: { type: DataTypes.STRING },
  cantidadRequerida: { type: DataTypes.INTEGER }
}, { tableName: 'DetalleOrdenVta', timestamps: false });

module.exports = DetalleOrdenVta;