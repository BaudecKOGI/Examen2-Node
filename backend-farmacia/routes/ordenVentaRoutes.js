const express = require('express');
const router = express.Router();
const ordenVentaController = require('../controllers/ordenVentaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', ordenVentaController.getOrdenesVenta);
router.post('/', authMiddleware, ordenVentaController.createOrdenVenta);

module.exports = router;