// src/pages/Offers.jsx
import React from 'react';

const Offers = () => {
    return (
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Ofertas Laborales</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Ejemplo de tarjeta de oferta */}
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                        <h2 className="text-xl font-semibold text-white">Oferta 1</h2>
                        <p className="text-gray-400">Descripción de la oferta laboral.</p>
                    </div>
                    {/* Repite tarjetas para otras ofertas */}
                </div>
            </div>
    );
};

export default Offers;