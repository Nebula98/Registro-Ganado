// controllers/ganadoController.js
const Ganado = require('../models/ganadoModel');

// Obtener todos los registros de ganado
const obtenerGanado = async (req, res) => {
  try {
    const ganado = await Ganado.find();
    res.json(ganado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro de ganado
const agregarGanado = async (req, res) => {
  const { nombre, raza, edad } = req.body;
  console.log('Datos recibidos:', req.body);  // Asegúrate de ver qué datos estamos recibiendo

  // Validación rápida de los datos
  if (!nombre || !raza || !edad) {
    console.log('Faltan datos:', { nombre, raza, edad });  // Log para ver qué falta
    return res.status(400).json({ message: 'Faltan datos en la solicitud' });
  }

  const nuevoGanado = new Ganado({ nombre, raza, edad });

  try {
    await nuevoGanado.save();
    res.status(201).json(nuevoGanado);
  } catch (error) {
    console.error('Error al guardar ganado:', error);  // Log detallado del error
    res.status(500).json({ message: error.message, stack: error.stack });  // Devuelve más detalles
  }
};




// Actualizar un registro de ganado
const actualizarGanado = async (req, res) => {
  const { nombre, raza, edad } = req.body;
  try {
    const ganado = await Ganado.findByIdAndUpdate(
      req.params.id,
      { nombre, raza, edad },
      { new: true }
    );
    res.json(ganado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un registro de ganado
const eliminarGanado = async (req, res) => {
  try {
    await Ganado.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  obtenerGanado,
  agregarGanado,
  actualizarGanado,
  eliminarGanado,
};
