# 🐄 Sistema de Gestión Ganadera

Sistema web completo para la administración y control de inventario ganadero y propiedades rurales. Desarrollado con React, Node.js, Express y MongoDB.

## 📋 Descripción

Aplicación full-stack que permite gestionar de manera eficiente el registro de ganado y fincas, con funcionalidades CRUD completas, interfaz moderna y responsive.

## ✨ Características

- 🐮 **Gestión de Ganado**: Registro, edición y eliminación de animales con datos de nombre, raza y edad
- 🏡 **Gestión de Fincas**: Administración de propiedades con ubicación y tamaño en hectáreas
- 🎨 **Interfaz Moderna**: Diseño profesional con Tailwind CSS
- 📱 **Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- 🔄 **Tiempo Real**: Actualización instantánea de datos
- ✏️ **Edición en Línea**: Modificación rápida de registros

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- Tailwind CSS
- Fetch API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## 📦 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/sistema-ganadero.git
cd sistema-ganadero
```

### 2. Configurar el Backend
```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (opcional)
# MONGO_URI=mongodb://localhost:27017/registro-ganado
# PORT=5000

# Iniciar el servidor
node server.js
```

El servidor correrá en `http://localhost:5000`

### 3. Configurar el Frontend
```bash
# En otra terminal, navegar a la carpeta del frontend
cd frontend-react

# Instalar dependencias
npm install

# Iniciar la aplicación
npm run dev
```

La aplicación correrá en `http://localhost:5173`

## 🗄️ Configuración de la Base de Datos

### MongoDB Local

Asegúrate de tener MongoDB instalado y corriendo:
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
```

### MongoDB Atlas (Nube)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu connection string
4. Agrégalo al archivo `.env` en el backend:
```
   MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/registro-ganado
```

## 🚀 Uso

1. **Accede a la aplicación** en `http://localhost:5173`
2. **Navega entre módulos** usando los botones en la barra superior
3. **Gestiona Ganado**:
   - Completa el formulario con nombre, raza y edad
   - Haz clic en "Agregar Animal"
   - Usa el lápiz azul para editar
   - Usa el ícono rojo para eliminar
4. **Gestiona Fincas**:
   - Ingresa nombre, ubicación y tamaño
   - Haz clic en "Registrar Finca"
   - Edita o elimina según necesites

## 📁 Estructura del Proyecto
```
proyecto-ganado/
├── backend/
│   ├── controllers/
│   │   ├── ganadoController.js
│   │   └── fincaController.js
│   ├── models/
│   │   ├── ganadoModel.js
│   │   └── fincaModel.js
│   ├── routes/
│   │   ├── ganadoRoutes.js
│   │   └── fincaRoutes.js
│   ├── server.js
│   └── package.json
├── frontend-react/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔧 Scripts Disponibles

### Backend
```bash
npm start          # Inicia el servidor en modo producción
npm run dev        # Inicia con nodemon (auto-reload)
```

### Frontend
```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Construye para producción
npm run preview    # Preview de la build de producción
```

## 🌐 API Endpoints

### Ganado
- `GET /api/ganado` - Obtener todos los animales
- `POST /api/ganado` - Crear nuevo animal
- `PUT /api/ganado/:id` - Actualizar animal
- `DELETE /api/ganado/:id` - Eliminar animal

### Fincas
- `GET /api/fincas` - Obtener todas las fincas
- `POST /api/fincas` - Crear nueva finca
- `PUT /api/fincas/:id` - Actualizar finca
- `DELETE /api/fincas/:id` - Eliminar finca

## 🐛 Solución de Problemas

### El backend no se conecta a MongoDB
- Verifica que MongoDB esté corriendo
- Revisa la URI de conexión en `.env`
- Comprueba las credenciales si usas Atlas

### Error 404 en las peticiones
- Asegúrate de que el backend esté corriendo en el puerto 5000
- Verifica que las rutas estén correctamente configuradas
- Revisa la consola del servidor para errores

### Tailwind CSS no funciona
- Ejecuta `npm install -D tailwindcss postcss autoprefixer`
- Verifica que `index.css` tenga las directivas de Tailwind
- Reinicia el servidor de desarrollo
