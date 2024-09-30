// src/pages/admin/LoginAdmin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../services/api'; // Asegúrate de que la ruta de api.js es correcta

const LoginAdmin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar después del login

  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setError(null); // Limpia el error previo

    try {
      const data = { userName, password }; // Prepara los datos para el API
      const response = await apiPost('/auth/login', data); // Llama a la API
      console.log(response); // Muestra la respuesta en la consola (puedes manejar esto según tus necesidades)
      
      // Redireccionar al dashboard admin si la autenticación es exitosa
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.message); // Maneja cualquier error que ocurra
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl mb-4">Iniciar Sesión Admin</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Muestra el error si existe */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;