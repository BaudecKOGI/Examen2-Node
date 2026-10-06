const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
  NroOrdenC: { type: DataTypes.INTEGER, primaryKey: true },
  CodMedicamento: { type: DataTypes.INTEGER, primaryKey: true },
  descripcion: { type: DataTypes.STRING },
  cantidad: { type: DataTypes.INTEGER },
  precio: { type: DataTypes.DECIMAL(10, 2) },
  montouni: { type: DataTypes.DECIMAL(10, 2) }
}, { tableName: 'DetalleOrdenCompra', timestamps: false });

module.exports = DetalleOrdenCompra;