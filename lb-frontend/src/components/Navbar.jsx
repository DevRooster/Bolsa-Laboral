import { removeAuthToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token y redirigir al login
    removeAuthToken();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl">Mi App</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;