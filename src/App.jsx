import React, { useState, useEffect } from 'react';

function App() {
  const [ganado, setGanado] = useState([]);
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    obtenerGanado();
  }, []);

  const obtenerGanado = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ganado');
      const data = await response.json();
      setGanado(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const agregarGanado = async () => {
    const edadNumber = parseInt(edad);

    if (isNaN(edadNumber) || !nombre || !raza) {
      setMensaje('Por favor completa todos los campos correctamente');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const nuevoGanado = { nombre, raza, edad: edadNumber };

    try {
      await fetch('http://localhost:5000/api/ganado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoGanado)
      });
      obtenerGanado();
      setNombre('');
      setRaza('');
      setEdad('');
      setMensaje('¡Animal agregado exitosamente!');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al agregar ganado:', error);
      setMensaje('Error al agregar el animal');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const editarGanado = (animal) => {
    setEditando(animal._id);
    setNombre(animal.nombre);
    setRaza(animal.raza);
    setEdad(animal.edad.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actualizarGanado = async () => {
    const edadNumber = parseInt(edad);

    if (isNaN(edadNumber) || !nombre || !raza) {
      setMensaje('Por favor completa todos los campos correctamente');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }

    const ganadoActualizado = { nombre, raza, edad: edadNumber };

    try {
      await fetch(`http://localhost:5000/api/ganado/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ganadoActualizado)
      });
      obtenerGanado();
      setNombre('');
      setRaza('');
      setEdad('');
      setEditando(null);
      setMensaje('¡Animal actualizado exitosamente!');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al actualizar ganado:', error);
      setMensaje('Error al actualizar el animal');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNombre('');
    setRaza('');
    setEdad('');
  };

  const eliminarGanado = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/ganado/${id}`, {
        method: 'DELETE'
      });
      obtenerGanado();
      setMensaje('Animal eliminado');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al eliminar ganado:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-emerald-500 rounded-full p-3 mr-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Registro de Ganado</h1>
          </div>
          <p className="text-center text-gray-600">Gestiona tu inventario ganadero de forma eficiente</p>
        </div>

        {/* Mensaje de notificación */}
        {mensaje && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg mb-6 shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {mensaje}
          </div>
        )}

        {/* Formulario de registro/edición */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            {editando ? (
              <>
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Animal
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar Nuevo Animal
              </>
            )}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Estrella"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Raza</label>
              <input
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                placeholder="Ej: Holstein"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Edad (años)</label>
              <input
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                placeholder="Ej: 3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          {editando ? (
            <div className="flex gap-3">
              <button
                onClick={actualizarGanado}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Actualizar Animal
              </button>
              <button
                onClick={cancelarEdicion}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={agregarGanado}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar Animal
            </button>
          )}
        </div>

        {/* Listado de ganado */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Inventario Actual
            <span className="ml-3 text-sm font-normal text-gray-500">
              ({ganado.length} {ganado.length === 1 ? 'animal' : 'animales'})
            </span>
          </h2>
          
          {ganado.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-lg">No hay animales registrados</p>
              <p className="text-sm mt-2">Agrega tu primer animal usando el formulario arriba</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {ganado.map((g) => (
                <div
                  key={g._id}
                  className={`bg-gradient-to-r from-emerald-50 to-green-50 border-2 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex items-center justify-between ${
                    editando === g._id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-emerald-200'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{g.nombre}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="bg-white px-3 py-1 rounded-full">
                        <strong>Raza:</strong> {g.raza}
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full">
                        <strong>Edad:</strong> {g.edad} {g.edad === 1 ? 'año' : 'años'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => editarGanado(g)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md"
                      title="Editar animal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => eliminarGanado(g._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md"
                      title="Eliminar animal"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;