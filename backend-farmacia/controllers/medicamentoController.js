const { Medicamento, TipoMedic, Especialidad } = require('../models');

// Obtener todos los medicamentos
exports.getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [
        { model: TipoMedic, attributes: ['CodTipoMed', 'descripcion'] },
        { model: Especialidad, attributes: ['CodEspec', 'descripcionEsp'] }
      ]
    });
    res.json(medicamentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener medicamentos', detalles: error.message });
  }
};

// Crear medicamento
exports.createMedicamento = async (req, res) => {
  try {
    const {
      descripcionMed,
      fechaFabricacion,
      fechaVencimiento,
      Presentacion,
      stock,
      precioVentaUni,
      precioVentaPres,
      CodTipoMed,
      Marca,
      CodEspec
    } = req.body;

    const nuevoMedicamento = await Medicamento.create({
      descripcionMed,
      fechaFabricacion,
      fechaVencimiento,
      Presentacion,
      stock,
      precioVentaUni,
      precioVentaPres,
      CodTipoMed,
      Marca,
      CodEspec
    });

    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear medicamento', detalles: error.message });
  }
};

// Eliminar medicamento
exports.deleteMedicamento = async (req, res) => {
  try {
    const { id } = req.params; // id corresponde a CodMedicamento
    const medicamento = await Medicamento.findByPk(id);
    if (!medicamento) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }

    await medicamento.destroy();
    res.json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar medicamento', detalles: error.message });
  }
};