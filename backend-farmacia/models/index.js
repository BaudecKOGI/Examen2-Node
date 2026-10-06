const sequelize = require('../config/db');
const User = require('./User');
const Laboratorio = require('./Laboratorio');
const OrdenCompra = require('./OrdenCompra');

// Relación 1 a N entre Laboratorio y OrdenCompra
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab', as: 'ordenesCompra' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab', as: 'laboratorio' });

module.exports = { sequelize, User, Laboratorio, OrdenCompra };