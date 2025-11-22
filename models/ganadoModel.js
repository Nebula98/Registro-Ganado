// const mongoose = require('mongoose');

// // Definir el esquema para el ganado
// const ganadoSchema = new mongoose.Schema({
//   nombre: { type: String, required: true },
//   raza: { type: String, required: true },
//   edad: { type: Number, required: true },
//   finca: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: false }
//   // Edad debe ser un número
// });

// // Crear el modelo a partir del esquema
// const Ganado = mongoose.model('Ganado', ganadoSchema);

// module.exports = Ganado;


const mongoose = require('mongoose');

const ganadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  raza: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ganado', ganadoSchema);