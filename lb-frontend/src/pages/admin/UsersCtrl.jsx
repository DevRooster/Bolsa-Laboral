import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../services/api';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate'; // Asegúrate de tener esta biblioteca instalada

Modal.setAppElement('#root');

const UsersCtrl = () => {
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [students, setStudents] = useState([]); // Estado para estudiantes
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para el modal de usuario
    const [studentModalIsOpen, setStudentModalIsOpen] = useState(false); // Estado para el modal de estudiante
    const [newUser, setNewUser] = useState({ userName: '', password: '' }); // Estado para el nuevo usuario
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellido: '',
        carrera: '',
        universidad: 'Universidad Peruana Union', // Universidad fija
        habilidades: '',
        experiencia: '',
        experienciaUnit: 'Año', // Unidad de experiencia
        authUserId: null
    }); // Estado para el nuevo estudiante
    const [createdUserId, setCreatedUserId] = useState(null); // Estado para guardar el ID del usuario creado
    const [createdUserName, setCreatedUserName] = useState(''); // Estado para guardar el userName del usuario creado

    // Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10; // Número de usuarios por página

    // Función para obtener los usuarios
    const fetchUsers = async () => {
        try {
            const data = await apiGet('/auth/users');
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error.message);
        }
    };

    // Función para obtener los estudiantes
    const fetchStudents = async () => {
        try {
            const data = await apiGet('/estudiante');
            setStudents(data);
        } catch (error) {
            console.error('Error al obtener los estudiantes:', error.message);
        }
    };

    // Función para manejar el cambio en el formulario de usuario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Función para manejar el cambio en el formulario de estudiante
    const handleStudentInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    // Función para crear un nuevo usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdUser = await apiPost('/auth/create', newUser);
            setCreatedUserId(createdUser.id);
            setCreatedUserName(createdUser.userName);
            setModalIsOpen(false);
            setStudentModalIsOpen(true); // Abre el modal para crear estudiante
            setNewUser({ userName: '', password: '' }); // Limpia el formulario
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
        }
    };

    // Función para crear el estudiante
    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentData = {
                ...newStudent,
                authUserId: createdUserId,
                authUserDto: {
                    id: createdUserId,
                    userName: createdUserName
                }
            };
            await apiPost('/estudiante', studentData);
            fetchUsers();
            fetchStudents();
            setStudentModalIsOpen(false);
            setNewStudent({
                nombre: '',
                apellido: '',
                carrera: '',
                universidad: 'Universidad Peruana Union',
                habilidades: '',
                experiencia: '',
                experienciaUnit: 'Año',
                authUserId: null
            });
        } catch (error) {
            console.error('Error al crear el estudiante:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStudents();
    }, []);

    // Manejo de cambios de página
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // Cálculo de usuarios a mostrar en la página actual
    const displayedUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

    return (
        <div className={`p-6 bg-gray-100 min-h-screen ${modalIsOpen || studentModalIsOpen ? 'blur' : ''}`}>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Control de Usuarios</h2>

            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 hover:bg-green-700 hover:shadow-lg transition-all duration-200"
            >
                Crear Usuario
            </button>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-4 text-left text-gray-600">ID</th>
                            <th className="border border-gray-300 p-4 text-left text-gray-600">Username</th>
                            <th className="border border-gray-300 p-4 text-left text-gray-600">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-4 text-gray-800">{user.id}</td>
                                <td className="border border-gray-300 p-4 text-gray-800">{user.userName}</td>
                                <td className="border border-gray-300 p-4 text-gray-800">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-4">
                <ReactPaginate
                    previousLabel={'← Anterior'}
                    nextLabel={'Siguiente →'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(users.length / usersPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'flex space-x-2'}
                    pageLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
                    previousLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
                    nextLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
                    activeLinkClassName={'bg-blue-500 text-white'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                />
            </div>

            {/* Modal para crear usuarios */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Crear Usuario"
                className="w-full max-w-md p-8 mx-auto my-20 bg-white rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <h2 className="text-2xl font-semibold mb-6">Crear Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={newUser.userName}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        Crear
                    </button>
                </form>
            </Modal>

            {/* Modal para crear estudiantes */}
            <Modal
                isOpen={studentModalIsOpen}
                onRequestClose={() => setStudentModalIsOpen(false)}
                contentLabel="Crear Estudiante"
                className="w-full max-w-xl p-4 mx-auto my-20 bg-white rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <h2 className="text-2xl font-semibold mb-6">Crear Estudiante</h2>
                <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="userName"
                            value={createdUserName}
                            disabled
                            className="border border-gray-300 p-3 w-full rounded-md bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={newStudent.nombre}
                            onChange={handleStudentInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={newStudent.apellido}
                            onChange={handleStudentInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Carrera:</label>
                        <select
                            name="carrera"
                            value={newStudent.carrera}
                            onChange={handleStudentInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        >
                            <option value="">Seleccionar Carrera</option>
                            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                            <option value="Ingeniería Civil">Ingeniería Civil</option>
                            <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Universidad:</label>
                        <input
                            type="text"
                            value={newStudent.universidad}
                            disabled
                            className="border border-gray-300 p-4 w-full rounded-md bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Habilidades:</label>
                        <input
                            type="text"
                            name="habilidades"
                            value={newStudent.habilidades}
                            onChange={handleStudentInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Experiencia:</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="number"
                                name="experiencia"
                                value={newStudent.experiencia}
                                onChange={handleStudentInputChange}
                                required
                                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                            />
                            <select
                                name="experienciaUnit"
                                value={newStudent.experienciaUnit}
                                onChange={handleStudentInputChange}
                                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                            >
                                <option value="Año">Año</option>
                                <option value="Mes">Mes</option>
                                <option value="Día">Día</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 col-span-2"
                    >
                        Crear Estudiante
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default UsersCtrl;