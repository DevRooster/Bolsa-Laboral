import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { FaTrashAlt, FaEdit, FaExclamationTriangle } from 'react-icons/fa';

Modal.setAppElement('#root'); // Configuración para accesibilidad del modal

const EstudianteCtrl = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [studentsPerPage] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentData, setStudentData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    carrera: '',
    universidad: '',
    habilidades: '',
    horasCompletadas: '',
  });
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Nuevo estado para el modal de edición

  // Obtener la lista de estudiantes
  const fetchStudents = async () => {
    try {
      const data = await apiGet('/estudiante');
      setStudents(data);
      setFilteredStudents(data);
      setTotalStudents(data.length);
    } catch (error) {
      setError('Error al obtener los estudiantes');
      console.error(error);
    }
  };

  // Eliminar un estudiante
  const handleDelete = async (id) => {
    try {
      await apiDelete(`/estudiante/${id}`);
      fetchStudents();
      setShowDeleteModal(false);
    } catch (error) {
      setError('Error al eliminar el estudiante');
      console.error(error);
    }
  };

  // Abrir el modal de eliminación
  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  // Abrir el modal de edición
  const openEditModal = (student) => {
    setEditingStudent(student.id);
    setStudentData({
      nombre: student.nombre,
      apellidoPaterno: student.apellidoPaterno,
      apellidoMaterno: student.apellidoMaterno,
      dni: student.dni,
      carrera: student.carrera,
      universidad: student.universidad,
      habilidades: student.habilidades,
      horasCompletadas: student.horasCompletadas,
    });
    setShowEditModal(true);
  };

  // Guardar los cambios del estudiante editado
  const handleSaveEdit = async () => {
    try {
      const dataToUpdate = {
        id: editingStudent, // Asegúrate de que esto tenga el ID correcto
        ...studentData
      };

      await apiPut(`/estudiante`, dataToUpdate); // Asegúrate de que este endpoint sea correcto
      fetchStudents();
      setEditingStudent(null);
      setStudentData({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        carrera: '',
        universidad: '',
        habilidades: '',
        horasCompletadas: '0',
      });
    } catch (error) {
      setError(`Error al editar el estudiante: ${error.message}`);
      console.error('Error al editar:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Manejar la paginación
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Manejar búsqueda
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = students.filter(student =>
      student.nombre.toLowerCase().includes(value.toLowerCase()) ||
      student.apellidoPaterno.toLowerCase().includes(value.toLowerCase()) ||
      student.apellidoMaterno.toLowerCase().includes(value.toLowerCase()) ||
      student.carrera.toLowerCase().includes(value.toLowerCase()) ||
      student.universidad.toLowerCase().includes(value.toLowerCase()) ||
      student.habilidades.toLowerCase().includes(value.toLowerCase()) ||
      student.horasCompletadas.toString().includes(value)
    );
    setFilteredStudents(filtered);
    setCurrentPage(0);
  };

  // Estudiantes para mostrar
  const displayedStudents = filteredStudents.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Control de Estudiantes</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-4 text-left text-gray-600">ID</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Nombre</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Apellido Paterno</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Apellido Materno</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Carrera</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Universidad</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Habilidades</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Horas Completadas</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-4 text-gray-800">{student.id}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.nombre}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.apellidoPaterno}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.apellidoMaterno}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.carrera}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.universidad}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.habilidades}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.horasCompletadas}</td>
                <td className="border border-gray-300 p-4 flex space-x-2">
                  <button onClick={() => openEditModal(student)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(student)} className="text-red-600 hover:text-red-800">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"← Anterior"}
        nextLabel={"Siguiente →"}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredStudents.length / studentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center space-x-2 mt-4'}
        pageLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
        previousLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
        nextLinkClassName={'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200'}
        activeLinkClassName={'bg-blue-500 text-white'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />

      {/* Modal de Eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaExclamationTriangle className="text-yellow-600 mr-2" /> Confirmar Eliminación
          </h2>
          <p>¿Estás seguro de que deseas eliminar al estudiante <strong>{studentToDelete?.nombre} {studentToDelete?.apellidoPaterno}</strong>?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(studentToDelete.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Edición */}
      <Modal
        isOpen={editingStudent !== null} // Abre el modal solo si hay un estudiante en edición
        onRequestClose={() => setEditingStudent(null)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-11/12 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Editar Estudiante</h2>

          {/* Formulario de edición */}
          <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-1" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={studentData.nombre}
                onChange={e => setStudentData({ ...studentData, nombre: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="apellidoPaterno">Apellido Paterno</label>
              <input
                type="text"
                id="apellidoPaterno"
                value={studentData.apellidoPaterno}
                onChange={e => setStudentData({ ...studentData, apellidoPaterno: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="apellidoMaterno">Apellido Materno</label>
              <input
                type="text"
                id="apellidoMaterno"
                value={studentData.apellidoMaterno}
                onChange={e => setStudentData({ ...studentData, apellidoMaterno: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="carrera">Carrera</label>
              <input
                type="text"
                id="carrera"
                value={studentData.carrera}
                onChange={e => setStudentData({ ...studentData, carrera: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="universidad">Universidad</label>
              <input
                type="text"
                id="universidad"
                value={studentData.universidad}
                onChange={e => setStudentData({ ...studentData, universidad: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="habilidades">Habilidades</label>
              <input
                type="text"
                id="habilidades"
                value={studentData.habilidades}
                onChange={e => setStudentData({ ...studentData, habilidades: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="horasCompletadas">Horas Completadas</label>
              <input
                type="text"
                id="horasCompletadas"
                value={studentData.horasCompletadas}
                onChange={e => setStudentData({ ...studentData, horasCompletadas: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mt-6 flex justify-end col-span-1 md:col-span-2 space-x-4">
              <button
                onClick={() => setEditingStudent(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EstudianteCtrl;