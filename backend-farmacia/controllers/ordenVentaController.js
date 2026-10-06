const { OrdenVenta, DetalleOrdenVta, Medicamento } = require('../models');

// Obtener todas las órdenes de venta con su detalle
exports.getOrdenesVenta = async (req, res) => {
  try {
    const ordenes = await OrdenVenta.findAll({
      include: [
        {
          model: DetalleOrdenVta,
          include: [{ model: Medicamento, attributes: ['CodMedicamento', 'descripcionMed'] }]
        }
      ]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes de venta', detalles: error.message });
  }
};

// Crear una orden de venta
exports.createOrdenVenta = async (req, res) => {
  try {
    const { fechaEmision, Motivo, Situacion } = req.body;
    const nuevaVenta = await OrdenVenta.create({
      fechaEmision,
      Motivo,
      Situacion
    });
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la orden de venta', detalles: error.message });
  }
};