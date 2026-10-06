const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  razonSocial: { type: DataTypes.STRING, allowNull: false },
  direccion: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING,
  contacto: DataTypes.STRING,
}, { tableName: 'Laboratorio', timestamps: false });

module.exports = Laboratorio;