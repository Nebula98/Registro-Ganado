const mongoose = require('mongoose');

const fincaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  tamano: { type: Number, required: true }, // en hectáreas
});

module.exports = mongoose.model('Finca', fincaSchema);
