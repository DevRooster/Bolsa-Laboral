import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarStandar = () => {
    return (
        <nav className="bg-gray-900 p-4 shadow-lg">
            <div className="flex justify-between items-center">
                <div className="text-neon-green text-2xl font-bold">MiAplicación</div>
                <ul className="flex space-x-12">
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-neon-pink'
                                    : 'text-gray-400 hover:text-neon-pink hover:text-white transition-colors'
                            }
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-neon-pink'
                                    : 'text-gray-400 hover:text-neon-pink hover:text-white transition-colors'
                            }
                        >
                            Nosotros
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-neon-pink'
                                    : 'text-gray-400 hover:text-neon-pink hover:text-white transition-colors'
                            }
                        >
                            Servicios
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-neon-pink'
                                    : 'text-gray-400 hover:text-neon-pink hover:text-white transition-colors'
                            }
                        >
                            Contacto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-neon-pink'
                                    : 'text-gray-400 hover:text-neon-pink hover:text-white transition-colors'
                            }
                        >
                            Iniciar Sesion
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarStandar;