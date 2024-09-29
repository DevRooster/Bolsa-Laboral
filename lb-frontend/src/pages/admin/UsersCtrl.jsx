import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../services/api'; // Asegúrate de que la ruta sea correcta
import Modal from 'react-modal';

// Asegúrate de que el modal se ajuste a tu aplicación
Modal.setAppElement('#root');

const UsersCtrl = () => {
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para el modal
    const [newUser, setNewUser] = useState({ userName: '', password: '' }); // Estado para el nuevo usuario

    // Función para obtener los usuarios
    const fetchUsers = async () => {
        try {
            const data = await apiGet('/auth/users');
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error.message);
        }
    };

    // Función para manejar el cambio en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Función para crear un nuevo usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada a la API para crear un usuario con solo userName y password
            await apiPost('/auth/create', newUser);
            fetchUsers(); // Refresca la lista de usuarios
            setNewUser({ userName: '', password: '' }); // Reinicia el formulario
            setModalIsOpen(false); // Cierra el modal
        } catch (error) {
            console.error('Error al crear el usuario:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers(); // Obtén los usuarios al cargar el componente
    }, []);

    return (
        <div className={`p-6 bg-gray-100 min-h-screen ${modalIsOpen ? 'blur' : ''}`}>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Control de Usuarios</h2>
            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg mb-6 hover:bg-green-700 hover:shadow-lg transition-all duration-200"
            >
                Crear Usuario
            </button>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-3 text-left text-gray-600">ID</th>
                            <th className="border border-gray-300 p-3 text-left text-gray-600">Username</th>
                            <th className="border border-gray-300 p-3 text-left text-gray-600">Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-3 text-gray-800">{user.id}</td>
                                <td className="border border-gray-300 p-3 text-gray-800">{user.userName}</td>
                                <td className="border border-gray-300 p-3 text-gray-800">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para crear usuarios */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Crear Usuario"
                className="w-full max-w-md p-8 mx-auto my-20 bg-white rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50" // Estilo para la superposición
            >
                <h2 className="text-2xl font-semibold mb-4">Crear Usuario</h2>
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
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 hover:shadow-lg transition-all duration-200"
                    >
                        Crear Usuario
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default UsersCtrl;