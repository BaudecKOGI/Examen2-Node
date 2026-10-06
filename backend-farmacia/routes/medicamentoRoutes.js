const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', medicamentoController.getMedicamentos);
router.post('/', authMiddleware, medicamentoController.createMedicamento);
router.delete('/:id', authMiddleware, medicamentoController.deleteMedicamento);

module.exports = router;