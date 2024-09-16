// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);
    // Estado para manejar los mensajes de alerta
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    // Estado para simular la carga
    const [loading, setLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Hook para redirección
    const navigate = useNavigate();

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setLoadingProgress(0);

        // Simulación de autenticación
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                    // Ejemplo de lógica de autenticación
                    const loginSuccess = true; // Cambia esto según el resultado de la autenticación

                    if (loginSuccess) {
                        setAlertMessage('Inicio de sesión exitoso.');
                        setAlertType('success');
                        // Redirige al usuario a la página de ofertas después de 1 segundo
                        setTimeout(() => {
                            navigate('/offers');
                        }, 1000);
                    } else {
                        setAlertMessage('Error en el inicio de sesión.');
                        setAlertType('error');
                    }
                    return 100;
                }
                return prev + 10; // Incrementa la barra de carga en 10%
            });
        }, 200); // Incrementa la barra cada 200 ms
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black p-4">
            <div className="w-full max-w-md md:max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg border border-white">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

                {/* Mensaje de alerta */}
                {alertMessage && (
                    <div 
                        className={`mb-4 p-4 rounded-md text-white ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        {alertMessage}
                    </div>
                )}

                {/* Barra de carga */}
                {loading && (
                    <div className="mb-4 w-full h-2 bg-gray-600 relative">
                        <div 
                            className="h-full bg-indigo-600 absolute"
                            style={{ width: `${loadingProgress}%`, transition: 'width 0.2s ease-in-out' }}
                        ></div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1"
                            >
                                {showPassword ? (
                                    // Icono de ojo abierto (mostrar contraseña)
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.545 1.733-1.512 3.255-2.782 4.344M15 12a3 3 0 01-6 0m-7.458 0C4.732 16.057 8.523 19 12 19c1.286 0 2.518-.253 3.628-.7"></path>
                                    </svg>
                                ) : (
                                    // Icono de ojo cerrado (ocultar contraseña)
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7A9.978 9.978 0 014.042 8.29m2.958-1.428A9.97 9.97 0 0112 5c1.286 0 2.518.253 3.628.7m3.331 1.773A9.97 9.97 0 0121.5 12c-.66 2.425-2.032 4.584-3.876 6.025m-3.73-3.73A3.012 3.012 0 0015 12c0-1.657-1.343-3-3-3-1.305 0-2.402.838-2.816 2.003"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                            Crear Cuenta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;