// src/pages/admin/LoginAdmin.jsx

import React, { useState, useEffect } from 'react';
import { apiPost, setAuthToken } from '../../services/api'; // Asegúrate de que estas funciones existan
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Verifica si ya hay un token en localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/admin/dashboard'); // Redirige si el usuario ya está autenticado
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPost('/auth/login', { userName, password });
      
      console.log('Respuesta del servidor:', response); // Verifica la estructura de la respuesta
      
      const ADMIN_ROLE = "USER_ADMIN"; // Constante para el rol de administrador

      if (response.token && response.role.toUpperCase() === ADMIN_ROLE) {
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
        
        <label htmlFor="username" className="block mb-2">Usuario</label>
        <input
          type="text"
          id="username" // Agrega un id para mejorar la accesibilidad
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Usuario"
          required
        />
        
        <label htmlFor="password" className="block mb-2">Contraseña</label>
        <input
          type="password"
          id="password" // Agrega un id para mejorar la accesibilidad
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