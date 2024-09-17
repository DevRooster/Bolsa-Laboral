import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return 'bg-gray-600';
    if (password.length < 4) return 'bg-red-600';
    if (password.length < 8) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Lógica para verificar que las contraseñas coinciden
    if (password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden.');
      setAlertType('error');
      setLoading(false);
      return;
    }

    try {
      // Realiza la solicitud de creación de usuario
      const response = await axios.post('http://localhost:8080/auth/create', {
        userName,
        password,
      });

      if (response.status === 200) {
        setAlertMessage('Cuenta creada exitosamente.');
        setAlertType('success');
        // Redirige al usuario al login después de 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setAlertMessage('Hubo un error al crear la cuenta.');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setAlertMessage('Ocurrió un error al crear la cuenta.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg border border-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>

        {/* Mensaje de alerta */}
        {alertMessage && (
          <div 
            className={`mb-4 p-4 rounded-md text-white ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input 
              type="text" 
              id="username" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white pr-10" // Espacio para el icono
                required
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
              >
                {showPassword ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.545 1.733-1.512 3.255-2.782 4.344M15 12a3 3 0 01-6 0m-7.458 0C4.732 16.057 8.523 19 12 19c1.286 0 2.518-.253 3.628-.7"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7A9.978 9.978 0 014.042 8.29m2.958-1.428A9.97 9.97 0 0112 5c1.286 0 2.518.253 3.628.7m3.331 1.773A9.97 9.97 0 0121.5 12c-.66 2.425-2.032 4.584-3.876 6.025m-3.73-3.73A3.012 3.012 0 0015 12c0-1.657-1.343-3-3-3-1.305 0-2.402.838-2.816 2.003"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white pr-10" // Espacio para el icono
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Password Strength</label>
            <div className="w-full h-2 mt-1 rounded bg-gray-600">
              <div 
                className={`h-full rounded ${getPasswordStrength()}`} 
                style={{ width: `${Math.min(password.length / 12 * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;