import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPut } from '../../services/api';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { FaTrashAlt, FaEdit, FaExclamationTriangle } from 'react-icons/fa';

Modal.setAppElement('#root'); // Configuración para accesibilidad del modal

const EmpresaCtrl = () => {
  const [empresas, setEmpresas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [empresasPorPagina] = useState(10);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [empresaData, setEmpresaData] = useState({
    nombre: '',
    sector: '',
    descripcion: '',
    direccion: '',
    telefono: '',
  });
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchEmpresas = async () => {
    try {
      const data = await apiGet('/empresa');
      setEmpresas(data);
      setFilteredEmpresas(data);
      setTotalEmpresas(data.length);
    } catch (error) {
      setError('Error al obtener las empresas');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDelete(`/empresa/${id}`);
      fetchEmpresas();
      setShowDeleteModal(false);
    } catch (error) {
      setError('Error al eliminar la empresa');
      console.error(error);
    }
  };

  const openDeleteModal = (empresa) => {
    setEmpresaToDelete(empresa);
    setShowDeleteModal(true);
  };

  const handleEdit = (empresa) => {
    setEditingEmpresa(empresa.id);
    setEmpresaData({
      nombre: empresa.nombre,
      sector: empresa.sector,
      descripcion: empresa.descripcion,
      direccion: empresa.direccion,
      telefono: empresa.telefono,
    });
  };

  const handleSaveEdit = async () => {
    try {
        // Prepara los datos a enviar, asegurándote de incluir el ID correcto
        const dataToUpdate = {
            id: editingEmpresa, // ID de la empresa que se está editando
            ...empresaData // Los datos de la empresa a actualizar
        };

        // Realiza la solicitud PUT al servidor
        await apiPut(`/empresa`, dataToUpdate); // Asegúrate de que el endpoint esté correcto

        // Actualiza la lista de empresas para reflejar los cambios
        fetchEmpresas();

        // Restablece el estado de edición
        setEditingEmpresa(null);
        setEmpresaData({
            nombre: '',
            sector: '',
            descripcion: '',
            direccion: '',
            telefono: '',
        });
    } catch (error) {
        setError(`Error al editar la empresa: ${error.message}`);
        console.error('Error al editar:', error);
    }
};

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(value.toLowerCase()) ||
      empresa.sector.toLowerCase().includes(value.toLowerCase()) ||
      empresa.descripcion.toLowerCase().includes(value.toLowerCase()) ||
      empresa.direccion.toLowerCase().includes(value.toLowerCase()) ||
      empresa.telefono.includes(value)
    );
    setFilteredEmpresas(filtered);
    setCurrentPage(0);
  };

  const displayedEmpresas = filteredEmpresas.slice(currentPage * empresasPorPagina, (currentPage + 1) * empresasPorPagina);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Control de Empresas</h2>
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
              <th className="border border-gray-300 p-4 text-left text-gray-600">Sector</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Descripción</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Dirección</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Teléfono</th>
              <th className="border border-gray-300 p-4 text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmpresas.map((empresa) => (
              <tr key={empresa.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.id}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.nombre}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.sector}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.descripcion}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.direccion}</td>
                <td className="border border-gray-300 p-4 text-gray-800">{empresa.telefono}</td>
                <td className="border border-gray-300 p-4 flex space-x-2">
                  <button onClick={() => handleEdit(empresa)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => openDeleteModal(empresa)} className="text-red-600 hover:text-red-800">
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
        pageCount={Math.ceil(filteredEmpresas.length / empresasPorPagina)}
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
          <p>¿Estás seguro de que deseas eliminar la empresa <strong>{empresaToDelete?.nombre}</strong>?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(empresaToDelete.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editingEmpresa !== null} // Abre el modal solo si hay una empresa en edición
        onRequestClose={() => setEditingEmpresa(null)}
        className="modal fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Editar Empresa</h2>

          {/* Formulario de edición */}
          <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={empresaData.nombre}
                onChange={e => setEmpresaData({ ...empresaData, nombre: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="sector">Sector</label>
              <input
                type="text"
                id="sector"
                value={empresaData.sector}
                onChange={e => setEmpresaData({ ...empresaData, sector: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                value={empresaData.descripcion}
                onChange={e => setEmpresaData({ ...empresaData, descripcion: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                value={empresaData.direccion}
                onChange={e => setEmpresaData({ ...empresaData, direccion: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                value={empresaData.telefono}
                onChange={e => setEmpresaData({ ...empresaData, telefono: e.target.value })}
                className="border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setEditingEmpresa(null)}
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

export default EmpresaCtrl;