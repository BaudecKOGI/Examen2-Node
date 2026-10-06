const express = require('express');
const router = express.Router();
const catalogosController = require('../controllers/catalogosController');

// Rutas para los selectores del frontend
router.get('/tipos-medicamento', catalogosController.getTiposMedicamento);
router.get('/especialidades', catalogosController.getEspecialidades);

module.exports = router;