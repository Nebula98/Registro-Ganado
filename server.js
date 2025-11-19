// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ganadoRoutes = require('./routes/ganadoRoutes');
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB usando la cadena de conexión desde .env
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/registro-ganado';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log('Error al conectar con MongoDB:', error));

// Usar las rutas de ganado
app.use('/api', ganadoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
