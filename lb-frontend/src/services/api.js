// src/services/api.js

import axios from 'axios';

// URL base constante
const API_URL = "http://localhost:8080"; 

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout de 10 segundos
});

// Manejo de errores
const handleError = (error) => {
  // Log del error para la depuración
  console.error('Error en la solicitud:', error);
  
  // Manejo de error de respuesta
  if (error.response) {
    // Si la respuesta es un error (código 4xx o 5xx)
    return error.response.data?.message || 'Error en la solicitud';
  } else if (error.request) {
    // Si no se recibe respuesta del servidor
    return 'No se recibió respuesta del servidor';
  } else {
    // Error al configurar la solicitud
    return error.message;
  }
};

// Función para hacer solicitudes POST
export const apiPost = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Retorna la respuesta
  } catch (error) {
    throw new Error(handleError(error)); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes GET
export const apiGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes PUT
export const apiPut = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Usar la función de manejo de errores
  }
};

// Función para hacer solicitudes DELETE
export const apiDelete = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Usar la función de manejo de errores
  }
};

// Interceptors para manejar globalmente errores o peticiones
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes agregar lógica para manejar errores globalmente aquí
    return Promise.reject(handleError(error));
  }
);