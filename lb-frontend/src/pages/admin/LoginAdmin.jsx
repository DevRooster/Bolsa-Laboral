// src/pages/admin/LoginAdmin.jsx

import React, { useState } from 'react';
import { apiPost, setAuthToken } from '../../services/api'; // Asegúrate de que estas funciones existan
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPost('/auth/login', { userName, password });
      
      console.log('Respuesta del servidor:', response); // Verifica la estructura de la respuesta
      
      if (response.token && response.role.toUpperCase() === "USER_ADMIN") {
        setAuthToken(response.token);
        navigate('/admin/dashboard');
      } else {
        alert('Credenciales incorrectas o rol no permitido');
      }
    } catch (error) {
      console.error('Error durante el login:', error); // Mostrar el error completo
      alert('Hubo un problema con el login. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form className="p-6 bg-white shadow-md rounded" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Iniciar Sesión Admin</h2>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Contraseña"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;