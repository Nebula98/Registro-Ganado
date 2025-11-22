const express = require('express');
const router = express.Router();
const fincaController = require('../controllers/fincaController');

// Obtener todas las fincas
router.get('/', fincaController.getFincas);  // ← '/' en lugar de '/fincas'

// Crear una nueva finca
router.post('/', fincaController.createFinca);

// Actualizar una finca
router.put('/:id', fincaController.updateFinca);

// Eliminar una finca
router.delete('/:id', fincaController.deleteFinca);

module.exports = router;