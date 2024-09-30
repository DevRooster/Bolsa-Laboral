import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { Outlet, useLocation } from 'react-router-dom';
import { apiGet } from '../../services/api';

const DashboardAdmin = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/admin/dashboard';

  const [userCount, setUserCount] = useState(0); // Estado para la cantidad de usuarios
  const [studentCount, setStudentCount] = useState(0); // Estado para la cantidad de estudiantes
  const [lastUpdated, setLastUpdated] = useState(''); // Estado para la última actualización

  // Función para obtener la cantidad de usuarios
  const getUsers = async () => {
    try {
      const users = await apiGet('/auth/users'); // Llama a la API para obtener los usuarios
      setUserCount(users.length); // Suponiendo que 'users' es un array de usuarios
      setLastUpdated(new Date().toLocaleString()); // Actualiza la fecha y hora actual
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Función para obtener la cantidad de estudiantes
  const getStudents = async () => {
    try {
      const students = await apiGet('/estudiante'); // Llama a la API para obtener los estudiantes
      setStudentCount(students.length); // Suponiendo que 'students' es un array de estudiantes
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    getUsers(); // Llama a la función para obtener usuarios al montar el componente
    getStudents(); // Llama a la función para obtener estudiantes al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Función para actualizar la cuenta de usuarios
  const refreshUserCount = () => {
    getUsers(); // Llama a la función para obtener usuarios
  };

  // Función para actualizar la cuenta de estudiantes
  const refreshStudentCount = () => {
    getStudents(); // Llama a la función para obtener estudiantes
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <AdminNavbar />
      <div className="flex-1 p-4 bg-white shadow-md rounded-lg overflow-auto">
        {isDashboardRoot && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de Usuarios */}
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Usuarios Registrados</h3>
              <p className="text-4xl font-bold">{userCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Estudiantes */}
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Estudiantes Registrados</h3>
              <p className="text-4xl font-bold">{studentCount}</p>
              <p className="text-sm mt-2">Última actualización: {lastUpdated}</p>
            </div>

            {/* Tarjeta de Empresas */}
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Empresas Registradas</h3>
              <p className="text-4xl font-bold">45</p>
              <p className="text-sm mt-2">Última actualización: Ayer</p>
            </div>

            {/* Tarjeta de Notificaciones */}
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Notificaciones</h3>
              <p className="text-4xl font-bold">12</p>
              <p className="text-sm mt-2">Última actualización: Hace 2 horas</p>
            </div>
          </div>
        )}

        {/* Aquí puedes añadir más contenido */}
        <Outlet context={{ refreshUserCount, refreshStudentCount }} /> {/* Pasamos las funciones al Outlet */}
      </div>
    </div>
  );
};

export default DashboardAdmin;