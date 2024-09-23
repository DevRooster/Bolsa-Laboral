import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardAdmin = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === '/admin/dashboard';

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <AdminNavbar />
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg overflow-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Dashboard Admin</h2>

        {isDashboardRoot && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de Usuarios */}
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Usuarios Registrados</h3>
              <p className="text-4xl font-bold">120</p>
              <p className="text-sm mt-2">Última actualización: Hoy</p>
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
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardAdmin;