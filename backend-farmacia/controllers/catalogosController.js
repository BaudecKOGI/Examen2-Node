const { TipoMedic, Especialidad } = require('../models');

exports.getTiposMedicamento = async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tipos de medicamento', detalles: error.message });
  }
};

exports.getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades', detalles: error.message });
  }
};