const { TipoMedic, Especialidad } = require('../models');

// Obtener todos los tipos
exports.getTiposMedicamento = async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de medicamento', detalles: error.message });
  }
};

// Crear nuevo tipo
exports.createTipoMedicamento = async (req, res) => {
  try {
    const { descripcion } = req.body;
    if (!descripcion || !descripcion.trim()) {
      return res.status(400).json({ error: 'La descripción del tipo es obligatoria' });
    }
    const nuevoTipo = await TipoMedic.create({ descripcion });
    res.status(201).json(nuevoTipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tipo de medicamento', detalles: error.message });
  }
};

// Obtener todas las especialidades
exports.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades', detalles: error.message });
  }
};

// Crear nueva especialidad
exports.createEspecialidad = async (req, res) => {
  try {
    const { descripcionEsp } = req.body;
    if (!descripcionEsp || !descripcionEsp.trim()) {
      return res.status(400).json({ error: 'La descripción de la especialidad es obligatoria' });
    }
    const nuevaEspecialidad = await Especialidad.create({ descripcionEsp });
    res.status(201).json(nuevaEspecialidad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear especialidad', detalles: error.message });
  }
};