const Finca = require('../models/fincaModel');
const Ganado = require('../models/ganadoModel');

exports.getFincas = async (req, res) => {
  const fincas = await Finca.find();
  res.json(fincas);
};

exports.createFinca = async (req, res) => {
  const finca = new Finca(req.body);
  await finca.save();
  res.json(finca);
};

exports.updateFinca = async (req, res) => {
  const finca = await Finca.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(finca);
};

exports.deleteFinca = async (req, res) => {
  await Finca.findByIdAndDelete(req.params.id);
  res.json({ message: 'Finca eliminada' });
};
