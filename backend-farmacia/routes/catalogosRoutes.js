const express = require('express');
const router = express.Router();
const catalogosController = require('../controllers/catalogosController');

// Rutas para tipos de medicamento
router.get('/tipos-medicamento', catalogosController.getTiposMedicamento);
router.post('/tipos-medicamento', catalogosController.createTipoMedicamento);

// Rutas para especialidades
router.get('/especialidades', catalogosController.getEspecialidades);
router.post('/especialidades', catalogosController.createEspecialidad);

module.exports = router;