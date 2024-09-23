import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavbarUser = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileOpen((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setProfileOpen(false);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg relative">
      <div className="flex justify-between items-center">
        <div className="text-neon-green text-2xl font-bold"></div>
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/user/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/postulaciones"
              className={({ isActive }) =>
                isActive ? 'text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
              }
            >
              Postulaciones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/ofertas"
              className={({ isActive }) =>
                isActive ? 'text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
              }
            >
              Ofertas
            </NavLink>
          </li>
          <li className="relative">
            <span
              onClick={toggleProfileMenu}
              className="text-gray-400 hover:text-neon-pink cursor-pointer flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" />
                <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              Perfil
            </span>
            {isProfileOpen && (
              <ul className="absolute right-0 bg-gray-800 text-white shadow-lg mt-2 w-48 rounded-md z-10">
                <li>
                  <NavLink
                    to="/user/profile/view"
                    className={({ isActive }) =>
                      isActive ? 'block px-4 py-2 bg-gray-700 rounded-md' : 'block px-4 py-2 hover:bg-gray-700 rounded-md'
                    }
                  >
                    Ver Perfil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/notificaciones"
                    className={({ isActive }) =>
                      isActive ? 'block px-4 py-2 bg-gray-700 rounded-md' : 'block px-4 py-2 hover:bg-gray-700 rounded-md'
                    }
                  >
                    Notificaciones
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/logout"
                    className="block px-4 py-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-md"
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* Cerrar el menú al hacer clic fuera */}
      {isProfileOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          onClick={closeProfileMenu}
        />
      )}
    </nav>
  );
};

export default NavbarUser;