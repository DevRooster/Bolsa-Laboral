import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api'; 

const PostulacionUser = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null); // Estado para la oferta seleccionada

  useEffect(() => {
    const fetchEstudianteAndPostulaciones = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setError('No se encontró un usuario logueado.');
          setLoading(false);
          return;
        }
  
        console.log('userId obtenido de localStorage:', userId);
  
        const estudiantes = await apiGet('/estudiante');
        console.log('Estudiantes obtenidos:', estudiantes);
  
        const estudianteLogueado = estudiantes.find(est => est.authUserId === parseInt(userId));
  
        if (!estudianteLogueado) {
          console.log(`No se encontró estudiante con authUserId: ${userId}`);
          setError('No se encontró el estudiante asociado a este usuario.');
          setLoading(false);
          return;
        }
  
        console.log('Estudiante logueado encontrado:', estudianteLogueado);
  
        setEstudiante(estudianteLogueado);
  
        const postulacionesResponse = await apiGet('/postulacion');
        console.log('Postulaciones obtenidas:', postulacionesResponse);
  
        const postulacionesEstudiante = postulacionesResponse.filter(
          (postulacion) => postulacion.estudianteId === estudianteLogueado.id
        );
  
        console.log('Postulaciones del estudiante logueado:', postulacionesEstudiante);
  
        setPostulaciones(postulacionesEstudiante);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEstudianteAndPostulaciones();
  }, []);

  const handleSelectOferta = async (ofertaId) => {
    try {
      const ofertaDetails = await apiGet(`/oferta/${ofertaId}`); // Asumiendo que la API tiene esta ruta
      setOfertaSeleccionada(ofertaDetails);
      console.log('Detalles de la oferta seleccionada:', ofertaDetails);
      
      // Deshabilitar el scroll
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error al obtener los detalles de la oferta:', error);
      setError('Error al cargar los detalles de la oferta.');
    }
  };

  const closeModal = () => {
    setOfertaSeleccionada(null);
    document.body.style.overflow = 'auto'; // Rehabilitar el scroll
  };

  if (loading) return <div className="text-center mt-4 text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Mis Postulaciones</h1>
      {postulaciones.length === 0 ? (
        <div className="text-gray-600">No tienes postulaciones registradas.</div>
      ) : (
        <div className="w-full max-w-3xl grid grid-cols-1 gap-4">
          {postulaciones.map((postulacion) => (
            <div
              key={postulacion.id}
              onClick={() => handleSelectOferta(postulacion.ofertaId)} // Manejo de selección
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-2">Oferta: {postulacion.ofertaDto.titulo}</h2>
              <p className="text-sm mb-1"><strong>Descripción:</strong> {postulacion.ofertaDto.descripcion}</p>
              <p className="text-sm mb-1"><strong>Ubicación:</strong> {postulacion.ofertaDto.ubicacion}</p>
              <p className="text-sm mb-1"><strong>Estado:</strong> {postulacion.estadoPostulacion}</p>
              <p className="text-sm mb-1"><strong>Fecha de Postulación:</strong> {postulacion.fechaPostulacion}</p>
            </div>
          ))}
        </div>
      )}

      {ofertaSeleccionada && ( // Condición para mostrar los detalles de la oferta seleccionada en un modal
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Detalles de la Oferta: {ofertaSeleccionada.titulo}</h2>
            <p className="text-sm mb-1"><strong>Descripción:</strong> {ofertaSeleccionada.descripcion}</p>
            <p className="text-sm mb-1"><strong>Ubicación:</strong> {ofertaSeleccionada.ubicacion}</p>
            <p className="text-sm mb-1"><strong>Tipo de Practicante:</strong> {ofertaSeleccionada.tipoPracticante}</p>
            <p className="text-sm mb-1"><strong>Duración:</strong> {ofertaSeleccionada.duracion}</p>
            <p className="text-sm mb-1"><strong>Empresa:</strong> {ofertaSeleccionada.empresaDto.nombre}</p>
            <p className="text-sm mb-1"><strong>Sector:</strong> {ofertaSeleccionada.empresaDto.sector}</p>
            <p className="text-sm mb-1"><strong>Dirección:</strong> {ofertaSeleccionada.empresaDto.direccion}</p>
            <p className="text-sm mb-1"><strong>Teléfono:</strong> {ofertaSeleccionada.empresaDto.telefono}</p>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostulacionUser;