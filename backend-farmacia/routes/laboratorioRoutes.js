const express = require('express');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', laboratorioController.getLaboratorios);
router.get('/:id', laboratorioController.getLaboratorioById);
router.post('/', authMiddleware, laboratorioController.createLaboratorio);
router.put('/:id', authMiddleware, laboratorioController.updateLaboratorio);
router.delete('/:id', authMiddleware, laboratorioController.deleteLaboratorio);

module.exports = router;