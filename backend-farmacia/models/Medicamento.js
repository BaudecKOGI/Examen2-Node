const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcionMed: { type: DataTypes.STRING, allowNull: false },
  fechaFabricacion: { type: DataTypes.DATEONLY },
  fechaVencimiento: { type: DataTypes.DATEONLY },
  Presentacion: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER },
  precioVentaUni: { type: DataTypes.DECIMAL(10, 2) },
  precioVentaPres: { type: DataTypes.DECIMAL(10, 2) },
  CodTipoMed: { type: DataTypes.INTEGER },
  Marca: { type: DataTypes.STRING },
  CodEspec: { type: DataTypes.INTEGER }
}, { tableName: 'Medicamento', timestamps: false });

module.exports = Medicamento;