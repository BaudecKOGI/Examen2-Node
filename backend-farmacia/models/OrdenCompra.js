const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenCompra = sequelize.define('OrdenCompra', {
  NroOrdenC: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaEmision: { type: DataTypes.DATEONLY },
  Situacion: { type: DataTypes.STRING },
  Total: { type: DataTypes.DECIMAL(10, 2) },
  CodLab: { type: DataTypes.INTEGER, allowNull: false },
  NrofacturaProv: { type: DataTypes.STRING }
}, { tableName: 'OrdenCompra', timestamps: false });

module.exports = OrdenCompra;