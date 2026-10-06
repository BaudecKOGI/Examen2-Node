const { Laboratorio, OrdenCompra } = require('../models');

exports.getAll = async (req, res) => {
  const labs = await Laboratorio.findAll({ include: 'ordenesCompra' });
  res.json(labs);
};

exports.create = async (req, res) => {
  const lab = await Laboratorio.create(req.body);
  res.status(201).json(lab);
};

exports.update = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id);
  if (!lab) return res.status(404).json({ message: 'No encontrado' });
  await lab.update(req.body);
  res.json(lab);
};

exports.delete = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id);
  if (!lab) return res.status(404).json({ message: 'No encontrado' });
  await lab.destroy();
  res.json({ message: 'Laboratorio eliminado' });
};