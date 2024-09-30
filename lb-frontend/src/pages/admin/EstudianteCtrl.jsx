import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // Configuración para accesibilidad del modal

const EstudianteCtrl = () => {
  const [students, setStudents] = useState([]); // Estado para los estudiantes
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [studentsPerPage] = useState(10); // Número de estudiantes por página
  const [totalStudents, setTotalStudents] = useState(0); // Total de estudiantes
  const [error, setError] = useState(''); // Para manejar errores
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredStudents, setFilteredStudents] = useState([]); // Estado para estudiantes filtrados
  const [editingStudent, setEditingStudent] = useState(null); // Estado para el estudiante que se está editando
  const [studentData, setStudentData] = useState({ // Datos del estudiante a editar
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    carrera: '',
    universidad: '',
    habilidades: '',
    horasCompletadas: 0,
  });

  // Función para obtener estudiantes
  const fetchStudents = async () => {
    try {
      const data = await apiGet('/estudiante');
      setStudents(data);
      setFilteredStudents(data); // Inicializa estudiantes filtrados con todos los estudiantes
      setTotalStudents(data.length); // Establecer total de estudiantes
    } catch (error) {
      setError('Error al obtener los estudiantes');
      console.error(error);
    }
  };

  // Función para eliminar un estudiante
  const handleDelete = async (id) => {
    try {
      await apiDelete(`/estudiante/${id}`);
      fetchStudents(); // Refresca la lista después de eliminar
    } catch (error) {
      setError('Error al eliminar el estudiante');
      console.error(error);
    }
  };

  // Función para manejar la edición de un estudiante
  const handleEdit = (student) => {
    setEditingStudent(student.id); // Establece el ID del estudiante que se está editando
    setStudentData({
      nombre: student.nombre,
      apellidoPaterno: student.apellidoPaterno,
      apellidoMaterno: student.apellidoMaterno,
      carrera: student.carrera,
      universidad: student.universidad, // Añadido el campo universidad
      habilidades: student.habilidades,
      horasCompletadas: student.horasCompletadas,
    }); // Establece los datos del estudiante en el estado
  };

  // Función para guardar los cambios después de editar
  const handleSaveEdit = async () => {
    try {
      await apiPut(`/estudiante/${editingStudent}`, studentData);
      fetchStudents(); // Refresca la lista después de editar
      setEditingStudent(null); // Cierra el modo de edición
      setStudentData({ // Limpia los datos
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        carrera: '',
        universidad: '', // Limpiado también
        habilidades: '',
        horasCompletadas: 0,
      });
    } catch (error) {
      setError('Error al editar el estudiante');
      console.error('Error al editar:', error); // Mejora en la consola para más detalles
    }
  };

  // Uso de useEffect para cargar estudiantes al iniciar el componente
  useEffect(() => {
    fetchStudents();
  }, []);

  // Manejo de cambios de página
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Manejo del filtro de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtra los estudiantes basado en el término de búsqueda
    const filtered = students.filter(student =>
      student.nombre.toLowerCase().includes(value.toLowerCase()) ||
      student.apellidoPaterno.toLowerCase().includes(value.toLowerCase()) ||
      student.apellidoMaterno.toLowerCase().includes(value.toLowerCase()) ||
      student.carrera.toLowerCase().includes(value.toLowerCase()) ||
      student.universidad.toLowerCase().includes(value.toLowerCase()) || // Añadido para filtrar por universidad
      student.habilidades.toLowerCase().includes(value.toLowerCase()) ||
      student.horasCompletadas.toString().includes(value)
    );

    setFilteredStudents(filtered);
    setCurrentPage(0); // Resetear la página al buscar
  };

  // Cálculo de estudiantes a mostrar en la página actual
  const displayedStudents = filteredStudents.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  return (
    <div className={`p-6 bg-gray-100 min-h-screen ${editingStudent ? 'blur' : ''}`}>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Control de Estudiantes</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>} {/* Mensaje de error */}

      {/* Campo de búsqueda */}
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
              <th className="border border-gray-300 p-4 text-left text-gray-600">Universidad</th> {/* Nuevo encabezado */}
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
                <td className="border border-gray-300 p-4 text-gray-800">{student.universidad}</td> {/* Nueva columna */}
                <td className="border border-gray-300 p-4 text-gray-800">{student.habilidades}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.horasCompletadas}</td>
                <td className="border border-gray-300 p-4 text-gray-800 flex space-x-2">
                  {/* Icono de editar */}
                  <button onClick={() => handleEdit(student)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 hover:text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232a1.5 1.5 0 00-2.121 0l-2.121 2.121 2.121 2.121 2.121-2.121a1.5 1.5 0 000-2.121zM6 18v2h12v-2H6z" />
                    </svg>
                  </button>
                  {/* Icono de eliminar */}
                  <button onClick={() => handleDelete(student.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 hover:text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6v12m3 0h3M5 6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para editar estudiante */}
      <Modal
        isOpen={editingStudent !== null}
        onRequestClose={() => setEditingStudent(null)}
        className="modal"
        overlayClassName="overlay"
      >
        <h3 className="text-lg font-semibold mb-4">Editar Estudiante</h3>
        <div>
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            value={studentData.nombre}
            onChange={(e) => setStudentData({ ...studentData, nombre: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <label className="block mb-2">Apellido Paterno:</label>
          <input
            type="text"
            value={studentData.apellidoPaterno}
            onChange={(e) => setStudentData({ ...studentData, apellidoPaterno: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <label className="block mb-2">Apellido Materno:</label>
          <input
            type="text"
            value={studentData.apellidoMaterno}
            onChange={(e) => setStudentData({ ...studentData, apellidoMaterno: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <label className="block mb-2">Carrera:</label>
          <select
            value={studentData.carrera}
            onChange={(e) => setStudentData({ ...studentData, carrera: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          >
            <option value="">Seleccionar carrera</option>
            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
            <option value="Diseño Gráfico">Diseño Gráfico</option>
            <option value="Administración">Administración</option>
            {/* Agregar más opciones según sea necesario */}
          </select>
          <label className="block mb-2">Universidad:</label>
          <input
            type="text"
            value={studentData.universidad}
            onChange={(e) => setStudentData({ ...studentData, universidad: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <label className="block mb-2">Habilidades:</label>
          <input
            type="text"
            value={studentData.habilidades}
            onChange={(e) => setStudentData({ ...studentData, habilidades: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <label className="block mb-2">Horas Completadas:</label>
          <input
            type="number"
            value={studentData.horasCompletadas}
            onChange={(e) => setStudentData({ ...studentData, horasCompletadas: e.target.value })}
            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
          />
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar Cambios
          </button>
          <button
            onClick={() => setEditingStudent(null)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ml-2"
          >
            Cancelar
          </button>
        </div>
      </Modal>

      {/* Paginación */}
      <ReactPaginate
        previousLabel={"← Anterior"}
        nextLabel={"Siguiente →"}
        pageCount={Math.ceil(filteredStudents.length / studentsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center my-4"}
        previousLinkClassName={"mr-2"}
        nextLinkClassName={"ml-2"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
        activeClassName={"font-bold"}
      />
    </div>
  );
};

export default EstudianteCtrl;