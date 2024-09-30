import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api'; // Asegúrate de que estas funciones están bien implementadas
import ReactPaginate from 'react-paginate'; // Asegúrate de tener esta biblioteca instalada

const EstudianteCtrl = () => {
  const [students, setStudents] = useState([]); // Estado para los estudiantes
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [studentsPerPage] = useState(10); // Número de estudiantes por página
  const [totalStudents, setTotalStudents] = useState(0); // Total de estudiantes
  const [error, setError] = useState(''); // Para manejar errores
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredStudents, setFilteredStudents] = useState([]); // Estado para estudiantes filtrados
  const [editingStudent, setEditingStudent] = useState(null); // Estado para el estudiante que se está editando
  const [studentData, setStudentData] = useState({}); // Datos del estudiante a editar

  // Función para obtener estudiantes
  const fetchStudents = async () => {
    try {
      const data = await apiGet('/estudiante');
      setStudents(data);
      setFilteredStudents(data); // Inicializa estudiantes filtrados con todos los estudiantes
      setTotalStudents(data.length); // Si necesitas el total para paginación
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
    setStudentData(student); // Establece los datos del estudiante en el estado
  };

  // Función para guardar los cambios después de editar
  const handleSaveEdit = async () => {
    try {
      await apiPut(`/estudiante/${editingStudent}`, studentData);
      fetchStudents(); // Refresca la lista después de editar
      setEditingStudent(null); // Cierra el modo de edición
      setStudentData({}); // Limpia los datos
    } catch (error) {
      setError('Error al editar el estudiante');
      console.error(error);
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
      student.apellido.toLowerCase().includes(value.toLowerCase()) ||
      student.carrera.toLowerCase().includes(value.toLowerCase()) ||
      student.habilidades.toLowerCase().includes(value.toLowerCase()) ||
      student.experiencia.toString().includes(value)
    );

    setFilteredStudents(filtered);
    setCurrentPage(0); // Resetear la página al buscar
  };

  // Cálculo de estudiantes a mostrar en la página actual
  const displayedStudents = filteredStudents.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
              <th className="border border-gray-300 p-4 text-left text-gray-600">Apellido</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Carrera</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Habilidades</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Experiencia</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-4 text-gray-800">{student.id}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.nombre}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.apellido}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.carrera}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.habilidades}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{student.experiencia} {student.experienciaUnit}</td>
                <td className="border border-gray-300 p-4 text-gray-800">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal o formulario de edición */}
      {editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Editar Estudiante</h3>
            <div>
              <label className="block mb-2">Nombre:</label>
              <input
                type="text"
                value={studentData.nombre}
                onChange={(e) => setStudentData({ ...studentData, nombre: e.target.value })}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
              />
              <label className="block mb-2">Apellido:</label>
              <input
                type="text"
                value={studentData.apellido}
                onChange={(e) => setStudentData({ ...studentData, apellido: e.target.value })}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
              />
              <label className="block mb-2">Carrera:</label>
              <input
                type="text"
                value={studentData.carrera}
                onChange={(e) => setStudentData({ ...studentData, carrera: e.target.value })}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
              />
              <label className="block mb-2">Habilidades:</label>
              <input
                type="text"
                value={studentData.habilidades}
                onChange={(e) => setStudentData({ ...studentData, habilidades: e.target.value })}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
              />
              <label className="block mb-2">Experiencia:</label>
              <input
                type="number"
                value={studentData.experiencia}
                onChange={(e) => setStudentData({ ...studentData, experiencia: e.target.value })}
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
          </div>
        </div>
      )}

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