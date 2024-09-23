// src/services/api.js

import axios from 'axios';

const API_URL = "http://localhost:8080"; // Base URL constante

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Función para establecer el token en los headers
export const setAuthToken = (token) => {
  if (token) {
    // Asigna el token al header Authorization
    localStorage.setItem('authToken', token);
  } else {
    // Elimina el token si no existe
    localStorage.removeItem('authToken');
  }
};

// Función para hacer solicitudes POST
export const apiPost = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Retorna la respuesta
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};

// Función para hacer solicitudes GET
export const apiGet = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};

// Función para hacer solicitudes PUT
export const apiPut = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};

// Función para hacer solicitudes DELETE
export const apiDelete = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};