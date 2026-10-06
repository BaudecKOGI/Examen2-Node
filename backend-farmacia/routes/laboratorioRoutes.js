const express = require('express');
const router = express.Router();
const labController = require('../controllers/laboratorioController');

router.get('/', labController.getAll);
router.post('/', labController.create);
router.put('/:id', labController.update);
router.delete('/:id', labController.delete);

module.exports = router;