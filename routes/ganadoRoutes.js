const express = require('express');
const router = express.Router();
const ganadoController = require('../controllers/ganadoController');

// Obtener todos los registros de ganado
router.get('/ganado', ganadoController.obtenerGanado);

// Crear un nuevo registro de ganado
router.post('/ganado', ganadoController.agregarGanado);

// Actualizar un registro de ganado
router.put('/ganado/:id', ganadoController.actualizarGanado);

// Eliminar un registro de ganado
router.delete('/ganado/:id', ganadoController.eliminarGanado);

module.exports = router;
