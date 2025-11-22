const express = require('express');
const router = express.Router();
const ganadoController = require('../controllers/ganadoController');

// Obtener todos los registros de ganado
router.get('/', ganadoController.obtenerGanado);

// Crear un nuevo registro de ganado
router.post('/', ganadoController.agregarGanado);

// Actualizar un registro de ganado
router.put('/:id', ganadoController.actualizarGanado);

// Eliminar un registro de ganado
router.delete('/:id', ganadoController.eliminarGanado);

module.exports = router;