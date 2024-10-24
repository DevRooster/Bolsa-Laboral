import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';

const CreateModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({ userName: '', password: '' });
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        carrera: '',
        universidad: 'Universidad Peruana Union',
        habilidades: '',
        horasCompletadas: 0,
        authUserId: null,
        dni: '',
    });
    const [isStudentFormVisible, setStudentFormVisible] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [createdUserName, setCreatedUserName] = useState('');

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleStudentInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdUser = await apiPost('/auth/create', newUser);
            setCreatedUserName(createdUser.userName);
            setNewStudent((prev) => ({ ...prev, authUserId: createdUser.id }));
            setNewUser({ userName: '', password: '' });
            setStudentFormVisible(true);
            setAlert({ message: 'Usuario creado exitosamente!', type: 'success' });
        } catch (error) {
            setAlert({ message: 'Error al crear el usuario: ' + error.message, type: 'error' });
        }
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiPost('/estudiante', {
                ...newStudent,
                dni: parseInt(newStudent.dni, 10),
            });
            setNewStudent({
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                carrera: '',
                universidad: 'Universidad Peruana Union',
                habilidades: '',
                horasCompletadas: 0,
                authUserId: null,
                dni: '',
            });
            setStudentFormVisible(false);
            setAlert({ message: 'Estudiante creado exitosamente!', type: 'success' });
            onClose(); // Cierra el modal después de crear el estudiante
            navigate('/'); // Redirige a la página principal o la página deseada
        } catch (error) {
            setAlert({ message: 'Error al crear el estudiante: ' + error.message, type: 'error' });
        }
    };

    const closeAlert = () => {
        setAlert({ message: '', type: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full relative"> {/* Cambiado a max-w-lg para un mejor ancho */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white hover:text-red-500 transition duration-200"
                    aria-label="Cerrar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {alert.message && (
                    <div className={`mb-4 p-4 rounded-md text-white ${alert.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                        <span>{alert.message}</span>
                        <button onClick={closeAlert} className="ml-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-1 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <h2 className="text-2xl font-semibold text-white mb-6">Crear Usuario</h2>
                <form onSubmit={handleUserSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={newUser.userName}
                            onChange={handleUserInputChange}
                            required
                            className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleUserInputChange}
                            required
                            className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                        Crear Usuario
                    </button>
                </form>
            </div>

            {isStudentFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full"> {/* Cambiado a max-w-lg para un mejor ancho */}
                        <h3 className="text-lg font-semibold text-white mb-4">Datos Personales</h3>
                        {createdUserName && (
                            <p className="text-white mb-4"><strong>Usuario:</strong> {createdUserName}</p>
                        )}
                        <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-300">Nombre:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={newStudent.nombre}
                                        onChange={handleStudentInputChange}
                                        required
                                        className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Apellido Paterno:</label>
                                    <input
                                        type="text"
                                        name="apellidoPaterno"
                                        value={newStudent.apellidoPaterno}
                                        onChange={handleStudentInputChange}
                                        required
                                        className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Apellido Materno:</label>
                                    <input
                                        type="text"
                                        name="apellidoMaterno"
                                        value={newStudent.apellidoMaterno}
                                        onChange={handleStudentInputChange}
                                        required
                                        className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-300">DNI:</label>
                                    <input
                                        type="text"
                                        name="dni"
                                        value={newStudent.dni}
                                        onChange={handleStudentInputChange}
                                        required
                                        className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Carrera:</label>
                                    <select
                                        name="carrera"
                                        value={newStudent.carrera}
                                        onChange={handleStudentInputChange}
                                        required
                                        className="border border-gray-600 p-3 w-6/6 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                                        <option value="Ingeniería Civil">Ingeniería Civil</option>
                                        <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300">Habilidades:</label>
                                <input
                                    type="text"
                                    name="habilidades"
                                    value={newStudent.habilidades}
                                    onChange={handleStudentInputChange}
                                    required
                                    className="border border-gray-600 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
                                />
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                                Crear Estudiante
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateModal;