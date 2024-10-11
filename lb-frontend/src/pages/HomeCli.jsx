import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api'; // Asegúrate de que esta función esté bien implementada
import NavbarStandar from '../components/NavbarStandar';

const HomeCli = () => {
    const [offers, setOffers] = useState([]); // Estado para almacenar las ofertas
    const [error, setError] = useState(''); // Estado para manejar errores

    // Función para obtener las ofertas de la API
    const fetchOffers = async () => {
        try {
            const data = await apiGet('/oferta');
            setOffers(data); // Almacenar las ofertas en el estado
        } catch (error) {
            setError('Error al obtener las ofertas');
            console.error(error);
        }
    };

    // Llamar a la API cuando el componente se monte
    useEffect(() => {
        fetchOffers();
    }, []);
    return (
        <div>
            {/* Agrega el NavbarStandar aquí */}
            <NavbarStandar />

            {/* Contenido del catálogo de ofertas */}
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Catálogo de Ofertas</h1>

                {/* Mostrar error si no se pudieron obtener las ofertas */}
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}

                {/* Contenedor de las ofertas */}
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Mapear las ofertas y mostrarlas en tarjetas */}
                    {offers.length > 0 ? (
                        offers.map((offer) => (
                            <div
                                key={offer.id}
                                className="w-72 p-6 border border-gray-300 rounded-lg shadow-md bg-white transform transition-transform duration-200 hover:scale-105"
                            >
                                <h2 className="text-xl font-bold text-gray-700 mb-2">{offer.titulo}</h2>
                                <p className="text-gray-600 mb-2">{offer.descripcion}</p>
                                <p className="text-gray-500 mb-1">
                                    <strong>Ubicación:</strong> {offer.ubicacion}
                                </p>
                                <p className="text-gray-500 mb-1">
                                    <strong>Duración:</strong> {offer.duracion}
                                </p>
                                <p className="text-gray-500 mb-1">
                                    <strong>Tipo de Practicante:</strong> {offer.tipoPracticante}
                                </p>
                                <p className="text-gray-500 mb-1">
                                    <strong>Empresa:</strong> {offer.empresaDto?.nombre || 'Sin Empresa'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No se encontraron ofertas</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeCli