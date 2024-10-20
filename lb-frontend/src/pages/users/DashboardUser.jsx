// Importación de imágenes
import oportunidadesLaborales from '../../images/oportunidades_laborales.png';
import desarrolloProfesional from '../../images/desarrollo_profesional.png';
import crecimientoCarrera from '../../images/crecimiento_carrera.png';
import apoyoEstudiantes from '../../images/apoyo_estudiantes.png';
import practicasEmpleos from '../../images/practicas_empleos.png';
import elegirOferta from '../../images/elegir_oferta.png';
import crear_usuario from '../../images/crear_usuario.png'; // Importación añadida

import React from 'react';
import NavbarUser from '../../components/NavbarUser';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardUser = () => {
    const location = useLocation();
    const isDashUserPath = location.pathname === '/user';

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavbarUser />
            {isDashUserPath && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-10"> {/* Se añadió mt-10 aquí */}
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={oportunidadesLaborales} alt="Oportunidades Laborales" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Oportunidades Laborales</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={desarrolloProfesional} alt="Desarrollo Profesional" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Desarrollo Profesional</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={crecimientoCarrera} alt="Crecimiento Carrera" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Crecimiento Carrera</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={apoyoEstudiantes} alt="Apoyo Estudiantes" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Apoyo Estudiantes</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={practicasEmpleos} alt="Prácticas y Empleos" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Prácticas y Empleos</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={elegirOferta} alt="Elegir Oferta" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Elegir Oferta</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                        <img src={crear_usuario} alt="Crear Usuario" className="h-32 w-auto mb-2" />
                        <h3 className="font-semibold text-lg text-gray-700">Crear Usuario</h3>
                    </div>
                </div>
            )}

            {/* Outlet para renderizar rutas hijas */}
            <Outlet />
        </div>
    );
}

export default DashboardUser;