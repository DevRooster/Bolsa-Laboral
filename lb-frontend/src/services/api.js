// src/services/api.js

import axios from 'axios';

const API_URL = "http://localhost:8080"; // Base URL constante

// Configuración de Axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Función para establecer el token en los headers y guardarlo en localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
  }
};

// Función para eliminar el token del localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken'); // Elimina el token de localStorage
};

// Función para obtener el token de localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Devuelve el token, si existe
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