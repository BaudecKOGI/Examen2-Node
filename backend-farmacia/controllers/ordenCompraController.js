const { OrdenCompra } = require('../models');

exports.getAll = async (req, res) => {
  const ordenes = await OrdenCompra.findAll({ include: 'laboratorio' });
  res.json(ordenes);
};

exports.create = async (req, res) => {
  const orden = await OrdenCompra.create(req.body);
  res.status(201).json(orden);
};

exports.update = async (req, res) => {
  const orden = await OrdenCompra.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ message: 'No encontrada' });
  await orden.update(req.body);
  res.json(orden);
};

exports.delete = async (req, res) => {
  const orden = await OrdenCompra.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ message: 'No encontrada' });
  await orden.destroy();
  res.json({ message: 'Orden eliminada' });
};