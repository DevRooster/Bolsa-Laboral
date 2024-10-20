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
        <div>
            <NavbarUser />
            {isDashUserPath && <h2 className="text-2xl font-bold text-center mt-4">Dashboard User</h2>}
            <div className="flex flex-wrap justify-center mt-4 p-4">
                {/* Cuadrícula de imágenes */}
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={oportunidadesLaborales} alt="Oportunidades Laborales" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Oportunidades Laborales</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={desarrolloProfesional} alt="Desarrollo Profesional" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Desarrollo Profesional</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={crecimientoCarrera} alt="Crecimiento Carrera" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Crecimiento Carrera</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={apoyoEstudiantes} alt="Apoyo Estudiantes" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Apoyo Estudiantes</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={practicasEmpleos} alt="Prácticas y Empleos" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Prácticas y Empleos</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={elegirOferta} alt="Elegir Oferta" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Elegir Oferta</h3>
                </div>
                <div className="m-4 p-4 shadow-lg rounded-lg bg-white text-center">
                    <img src={crear_usuario} alt="Crear Usuario" className="h-32 w-auto mx-auto mb-2" />
                    <h3 className="font-semibold">Crear Usuario</h3>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default DashboardUser;