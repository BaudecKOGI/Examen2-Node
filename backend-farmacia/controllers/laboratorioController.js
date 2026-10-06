const { Laboratorio } = require('../models');

// Obtener todos los laboratorios
exports.getLaboratorios = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener laboratorios', detalles: error.message });
  }
};

// Obtener laboratorio por CodLab
exports.getLaboratorioById = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }
    res.json(laboratorio);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el laboratorio', detalles: error.message });
  }
};

// Crear laboratorio
exports.createLaboratorio = async (req, res) => {
  try {
    const { razonSocial, direccion, telefono, email, contacto } = req.body;
    const nuevoLab = await Laboratorio.create({
      razonSocial,
      direccion,
      telefono,
      email,
      contacto
    });
    res.status(201).json(nuevoLab);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear laboratorio', detalles: error.message });
  }
};

// Actualizar laboratorio
exports.updateLaboratorio = async (req, res) => {
  try {
    const { id } = req.params; // id corresponde a CodLab
    const { razonSocial, direccion, telefono, email, contacto } = req.body;
    
    const laboratorio = await Laboratorio.findByPk(id);
    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }

    await laboratorio.update({ razonSocial, direccion, telefono, email, contacto });
    res.json(laboratorio);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar laboratorio', detalles: error.message });
  }
};

// Eliminar laboratorio
exports.deleteLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratorio = await Laboratorio.findByPk(id);
    if (!laboratorio) {
      return res.status(404).json({ error: 'Laboratorio no encontrado' });
    }

    await laboratorio.destroy();
    res.json({ mensaje: 'Laboratorio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar laboratorio', detalles: error.message });
  }
};