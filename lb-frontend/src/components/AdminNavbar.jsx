import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate(); // Hook de React Router para redireccionar

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Eliminar el token de localStorage (o sessionStorage si prefieres)
    localStorage.removeItem('authToken');

    // Redirigir al usuario a la página de login
    navigate('/login/admin');
  };

  return (
    <nav className="bg-black p-4">
      <ul className="flex justify-center space-x-6">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7h3v9h4V9h6v7h4V7h3L12 2z" />
            </svg>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/users"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" />
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span>Usuarios</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/empresa"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
            <span>Empresas</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/estudiante"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" />
              <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span>Estudiantes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/notificacion"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M11 14h2v-2h-2v2zm0-4h2V7h-2v3z" />
            </svg>
            <span>Notificaciones</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/oferta"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17v-1.5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1V17H3zM12 3a2 2 0 00-2 2v2H7l5 5 5-5h-3V5a2 2 0 00-2-2z" />
            </svg>
            <span>Ofertas</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/postulacion"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M11 10h2v4h-2v-4zm0 6h2v-2h-2v2z" />
            </svg>
            <span>Postulación</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/dashboard/seguimiento"
            className={({ isActive }) =>
              isActive ? 'text-white flex items-center space-x-2' : 'text-gray-400 flex items-center space-x-2'
            }
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M16 10h-4v6h-2v-6H8V8h2V7.41c0-.89.68-1.41 1.41-1.41h3.18c.73 0 1.41.52 1.41 1.41V8h2v2z" />
            </svg>
            <span>Seguimiento</span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}  // Llama a la función de cierre de sesión
            className="text-red-500 flex items-center space-x-2"
            style={{ transition: 'color 0.3s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H8V7l-5 5 5 5v-4h8zM19 3h-6v2h6v14h-6v2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;