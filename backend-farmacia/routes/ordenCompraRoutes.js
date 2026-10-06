const express = require('express');
const router = express.Router();
const ordenCompraController = require('../controllers/ordenCompraController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', ordenCompraController.getOrdenesCompra);
router.post('/', authMiddleware, ordenCompraController.createOrdenCompra);
router.delete('/:id', authMiddleware, ordenCompraController.deleteOrdenCompra);

module.exports = router;