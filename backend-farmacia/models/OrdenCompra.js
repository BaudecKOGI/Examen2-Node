const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenCompra = sequelize.define('OrdenCompra', {
  NroOrdenC: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaEmision: { type: DataTypes.DATEONLY, allowNull: false },
  Situacion: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
  Total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  CodLab: { type: DataTypes.INTEGER, allowNull: false },
  NrofacturaProv: DataTypes.STRING,
}, { tableName: 'OrdenCompra', timestamps: false });

module.exports = OrdenCompra;