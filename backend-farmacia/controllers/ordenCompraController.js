const { OrdenCompra, Laboratorio, DetalleOrdenCompra, Medicamento } = require('../models');

// Obtener todas las órdenes de compra con su laboratorio y detalles
exports.getOrdenesCompra = async (req, res) => {
  try {
    const ordenes = await OrdenCompra.findAll({
      include: [
        { model: Laboratorio, attributes: ['CodLab', 'razonSocial'] },
        { 
          model: DetalleOrdenCompra,
          include: [{ model: Medicamento, attributes: ['CodMedicamento', 'descripcionMed'] }]
        }
      ]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes de compra', detalles: error.message });
  }
};

// Crear una orden de compra
exports.createOrdenCompra = async (req, res) => {
  try {
    const { fechaEmision, Situacion, Total, CodLab, NrofacturaProv } = req.body;
    const nuevaOrden = await OrdenCompra.create({
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv
    });
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la orden de compra', detalles: error.message });
  }
};

// Eliminar orden de compra
exports.deleteOrdenCompra = async (req, res) => {
  try {
    const { id } = req.params; // id corresponde a NroOrdenC
    const orden = await OrdenCompra.findByPk(id);
    if (!orden) {
      return res.status(404).json({ error: 'Orden de compra no encontrada' });
    }

    await orden.destroy();
    res.json({ mensaje: 'Orden de compra eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden de compra', detalles: error.message });
  }
};