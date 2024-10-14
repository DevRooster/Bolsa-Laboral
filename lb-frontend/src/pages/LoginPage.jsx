import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api'; // Importamos la función apiPost para las solicitudes
import CreateModal from '../components/CreateModal'; // Importamos el modal de crear cuenta

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Para controlar la visibilidad del fondo
  const [isModalOpen, setIsModalOpen] = useState(false); // Para controlar la visibilidad del modal de creación de cuenta
  const navigate = useNavigate();

  // Efecto para manejar la visibilidad del fondo
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200); // Mostrar con animación
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud a la API de autenticación
      const data = {
        userName: username,
        password: password,
      };

      const response = await apiPost('/auth/login', data); // Usar apiPost para la solicitud

      // Imprime la respuesta de la API para depurar
      console.log('Respuesta de la API:', response);

      const { role, token } = response; // Asegúrate de que el token y el rol estén en la respuesta correcta

      // Almacenar el token en localStorage
      localStorage.setItem('token', token);

      // Redirigir según el rol del usuario
      if (role === 'USER_ADMIN') {
        navigate('/admin');
      } else if (role === 'USER_DEFAULT') {
        navigate('/user');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);

      // Verifica el error y muestra un mensaje adecuado
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Usuario o contraseña incorrectos'}`);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir a la ruta principal
  };

  // Función para manejar la apertura del modal de creación de cuentas
  const handleCreateAccount = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  // Función para redirigir después de crear el usuario
  const handleUserCreated = () => {
    navigate('/'); // Redirigir a la ruta de inicio (o donde desees)
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-r from-indigo-50 to-purple-100 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fondo borroso */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`} />

      <div className={`flex items-center justify-center min-h-screen relative transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-8'}`}>
        <div className={`bg-gray-800 rounded-lg shadow-xl p-4 w-full max-w-sm`}>
          <h2 className="text-2xl font-semibold text-white text-center mb-8">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Ingresar Usuario"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Ingresar Contraseña"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="bg-gray-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-500 transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
          {/* Sección de creación de cuenta */}
          <div className="mt-4 flex justify-center">
            <ul className="list-disc text-gray-300">
    
                <button
                  onClick={handleCreateAccount}
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Crear Cuenta
                </button>

            </ul>
          </div>
        </div>
      </div>

      {/* Modal para crear cuenta */}
      <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} onUserCreated={handleUserCreated} />
    </div>
  );
};

export default LoginPage;