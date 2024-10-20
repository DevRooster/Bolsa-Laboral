import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../services/api'; // Asegúrate de que estas funciones están definidas correctamente.

const OfertaUser = () => {
  const [ofertas, setOfertas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]); // Estado para la lista de estudiantes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOferta, setSelectedOferta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [estudiante, setEstudiante] = useState(null); // Datos del estudiante
  const [dni, setDni] = useState(''); // Estado para el input del DNI

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await apiGet('/oferta'); // Realiza la llamada GET a la API
        setOfertas(response);
      } catch (err) {
        setError('Error al cargar las ofertas. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const fetchEstudiantes = async () => {
      try {
        const response = await apiGet('/estudiante'); // Obtener lista de estudiantes
        setEstudiantes(response);
      } catch (err) {
        setError('Error al cargar la lista de estudiantes. Intenta de nuevo más tarde.');
      }
    };

    fetchOfertas();
    fetchEstudiantes();
  }, []);

  const handleSelect = (oferta) => {
    setSelectedOferta(oferta);
    setShowModal(true); // Mostrar el modal al seleccionar una oferta
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOferta(null);
    setEstudiante(null); // Limpiamos estudiante al cerrar el modal
    setDni(''); // Limpiamos el DNI
    setError(null); // Limpiamos el mensaje de error
  };

  const handleDniSearch = () => {
    if (dni.trim() === '') {
      setError('Por favor, ingresa un DNI válido.');
      closeModal(); // Cerrar modal al mostrar el error
      return;
    }

    // Buscar estudiante por DNI en la lista de estudiantes
    const foundEstudiante = estudiantes.find(est => est.dni.toString() === dni);

    if (foundEstudiante) {
      setEstudiante(foundEstudiante); // Guardamos los datos del estudiante si es encontrado
      setError(null); // Limpiar errores
    } else {
      setError('No se encontró ningún estudiante con ese DNI.'); // Mostrar error en el modal
      setEstudiante(null);
      closeModal(); // Cerrar modal al mostrar el error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!estudiante) {
      alert('Por favor, busca y selecciona un estudiante válido.');
      return;
    }

    const postulacionData = {
      id: 0,
      estadoPostulacion: 'PENDIENTE', // Estado por defecto
      fechaPostulacion: new Date().toISOString().split('T')[0], // Fecha actual
      estudianteId: estudiante.id, // ID del estudiante
      estudianteDto: estudiante, // Objeto completo del estudiante
      ofertaId: selectedOferta.id, // ID de la oferta seleccionada
      ofertaDto: selectedOferta // Objeto completo de la oferta seleccionada
    };

    try {
      await apiPost('/postulacion', postulacionData); // Envío de la postulación
      alert('Postulación enviada exitosamente');
      closeModal();
    } catch (error) {
      alert('Hubo un error al enviar la postulación. Inténtalo nuevamente.');
    }
  };

  if (loading) return <div className="text-center mt-4 text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertas.map(oferta => (
          <div 
            key={oferta.id} 
            className="bg-gray-700 text-white shadow-lg rounded-lg p-6 border border-gray-800 cursor-pointer hover:bg-gray-600 transition duration-200 transform hover:scale-105"
            onClick={() => handleSelect(oferta)}
          >
            <h2 className="text-2xl font-semibold mb-4">{oferta.titulo}</h2>
            <div className="mb-4">
              <p className="text-sm mb-1"><strong>Descripción:</strong> {oferta.descripcion}</p>
              <p className="text-sm mb-1"><strong>Ubicación:</strong> {oferta.ubicacion}</p>
              <p className="text-sm mb-1"><strong>Tipo de Practicante:</strong> {oferta.tipoPracticante}</p>
              <p className="text-sm mb-1"><strong>Duración:</strong> {oferta.duracion}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedOferta && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0" onClick={closeModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Postulación para {selectedOferta.titulo}</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Campo de búsqueda de estudiante por DNI */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Buscar Estudiante por DNI</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={dni} 
                    onChange={(e) => setDni(e.target.value)} 
                    placeholder="Ingrese DNI" 
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                  />
                  <button 
                    type="button" 
                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    onClick={handleDniSearch}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {/* Mostrar los datos del estudiante si fue encontrado */}
              {estudiante && (
                <div className="mb-4 bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-semibold mb-2">Datos del Estudiante</h3>
                  <p className="text-sm"><strong>Nombre:</strong> {estudiante.nombre}</p>
                  <p className="text-sm"><strong>Apellido Paterno:</strong> {estudiante.apellidoPaterno}</p>
                  <p className="text-sm"><strong>Apellido Materno:</strong> {estudiante.apellidoMaterno}</p>
                  <p className="text-sm"><strong>Carrera:</strong> {estudiante.carrera}</p>
                  <p className="text-sm"><strong>Universidad:</strong> {estudiante.universidad}</p>
                </div>
              )}

              {/* Sección de la postulación */}
              {estudiante && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Formulario de Postulación</h3>
                  <p className="text-sm mb-1"><strong>Estado de Postulación:</strong> PENDIENTE</p>
                  <p className="text-sm mb-1"><strong>Fecha de Postulación:</strong> {new Date().toISOString().split('T')[0]}</p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <button 
                  type="button" 
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  disabled={!estudiante} // Deshabilitar si no se ha encontrado un estudiante
                >
                  Enviar Postulación
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 text-red-500 text-sm">{error}</div> // Mostrar mensaje de error si existe
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertaUser;