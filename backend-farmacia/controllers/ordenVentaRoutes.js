const express = require('express');
const router = express.Router();
const ordenVentaController = require('../controllers/ordenVentaController');

router.get('/', ordenVentaController.getOrdenesVenta);
router.post('/', ordenVentaController.createOrdenVenta);

module.exports = router;