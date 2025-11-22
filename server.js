// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const ganadoRoutes = require('./routes/ganadoRoutes');
const fincaRoutes = require('./routes/fincaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// CONEXIÓN A MONGODB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/registro-ganado';

mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((error) => console.log('❌ Error al conectar con MongoDB:', error));


// RUTAS
app.use('/api/ganado', ganadoRoutes);
app.use('/api/fincas', fincaRoutes);


// INICIAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
