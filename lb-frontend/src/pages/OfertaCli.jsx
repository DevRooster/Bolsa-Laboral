import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api'; // Asegúrate de que esta función está definida correctamente.

const OfertaCli = () => {
  const [ofertas, setOfertas] = useState([]); // Cambiamos a un array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await apiGet('/oferta');
        
        if (Array.isArray(response) && response.length > 0) {
          setOfertas(response); // Asigna el array completo de ofertas al estado.
        } else {
          setError('No se encontraron ofertas.'); // Mensaje si el array está vacío.
        }
      } catch (err) {
        setError('Error al cargar las ofertas. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  if (loading) return <div className="text-center mt-4 text-gray-500">Cargando...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Cambia a un grid para múltiples tarjetas */}
        {ofertas.map(oferta => (
          <div key={oferta.id} className="bg-gray-700 text-white shadow-lg rounded-lg p-6 border border-gray-800"> {/* Fondo oscuro y borde más oscuro */}
            <h2 className="text-2xl font-semibold mb-4">{oferta.titulo}</h2>
            <div className="mb-4">
              <p className="text-sm mb-1"><strong>Descripción:</strong> {oferta.descripcion}</p>
              <p className="text-sm mb-1"><strong>Ubicación:</strong> {oferta.ubicacion}</p>
              <p className="text-sm mb-1"><strong>Tipo de Practicante:</strong> {oferta.tipoPracticante}</p>
              <p className="text-sm mb-1"><strong>Duración:</strong> {oferta.duracion}</p>
            </div>

            {oferta.empresaDto && (
              <div className="bg-gray-600 p-4 rounded-lg border border-gray-800"> {/* Fondo de la sección de empresa en gris más claro */}
                <h3 className="text-xl font-medium mb-2">Detalles de la Empresa</h3>
                <p className="text-sm mb-1"><strong>Nombre:</strong> {oferta.empresaDto.nombre}</p>
                <p className="text-sm mb-1"><strong>Sector:</strong> {oferta.empresaDto.sector}</p>
                <p className="text-sm mb-1"><strong>Descripción:</strong> {oferta.empresaDto.descripcion}</p>
                <p className="text-sm mb-1"><strong>Dirección:</strong> {oferta.empresaDto.direccion}</p>
                <p className="text-sm mb-1"><strong>Teléfono:</strong> {oferta.empresaDto.telefono}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertaCli;