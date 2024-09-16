// src/components/UserNavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = ({ userName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para alternar el menú
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Función para manejar el clic en una opción del menú
    const handleMenuClick = (route) => {
        window.location.href = route;
    };

    return (
        <nav className="bg-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Título */}
                <h1 className="text-white text-2xl font-bold">Bolsa Laboral</h1>

                {/* Menú desplegable */}
                <div className="relative">
                    {/* Botón del menú */}
                    <button
                        onClick={toggleMenu}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 flex items-center space-x-2"
                    >
                        <span>{userName || "Nombre del Usuario"}</span>
                        <svg
                            className={`w-4 h-4 text-white transition-transform duration-300 ${isMenuOpen ? 'transform rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    {/* Menú desplegable */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-lg w-48">
                            <button
                                onClick={() => handleMenuClick('/profile')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                            >
                                Perfil
                            </button>
                            <button
                                onClick={() => handleMenuClick('/logout')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;