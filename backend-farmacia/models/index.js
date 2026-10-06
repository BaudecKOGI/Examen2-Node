const sequelize = require('../config/db'); // Importamos la conexión
const User = require('./User');
const Laboratorio = require('./Laboratorio');
const TipoMedic = require('./TipoMedic');
const Especialidad = require('./Especialidad');
const Medicamento = require('./Medicamento');
const OrdenCompra = require('./OrdenCompra');
const DetalleOrdenCompra = require('./DetalleOrdenCompra');
const OrdenVenta = require('./OrdenVenta');
const DetalleOrdenVta = require('./DetalleOrdenVta');

// Relaciones Medicamento
Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec' });

TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed' });
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' });

// Relaciones OrdenCompra
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab' });
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab' });

OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'NroOrdenC' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'NroOrdenC' });

Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });

// Relaciones OrdenVenta
OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: 'NroOrdenVta' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'NroOrdenVta' });

Medicamento.hasMany(DetalleOrdenVta, { foreignKey: 'CodMedicamento' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });

module.exports = {
  sequelize, // Exportamos la instancia para que server.js la pueda leer
  User,
  Laboratorio,
  TipoMedic,
  Especialidad,
  Medicamento,
  OrdenCompra,
  DetalleOrdenCompra,
  OrdenVenta,
  DetalleOrdenVta
};