// src/pages/admin/EstudianteCtrl.jsx

import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete, setAuthToken } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const EstudianteCtrl = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    carrera: '',
    universidad: '',
    habilidades: '',
    experiencia: '',
    authUserId: '' // Puedes ajustar esto según cómo obtienes el authUserId
  });
  const [editingId, setEditingId] = useState(null); // Para manejar la edición
  const navigate = useNavigate();

  // Obtener la lista de estudiantes al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login/admin'); // Redirige si no hay token
    } else {
      setAuthToken(token); // Establece el token en los headers
      fetchEstudiantes();
    }
  }, [navigate]);

  const fetchEstudiantes = async () => {
    try {
      const response = await apiGet('/estudiante'); // Asume que este endpoint devuelve la lista de estudiantes
      setEstudiantes(response);
    } catch (error) {
      console.error('Error fetching estudiantes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Editar estudiante
        await apiPut(`/estudiante/${editingId}`, formData);
        alert('Estudiante actualizado con éxito.');
      } else {
        // Crear nuevo estudiante
        await apiPost('/estudiante', formData);
        alert('Estudiante creado con éxito.');
      }
      fetchEstudiantes(); // Refrescar la lista de estudiantes
      resetForm();
    } catch (error) {
      console.error('Error durante la operación:', error);
      alert('Hubo un problema, inténtalo nuevamente.');
    }
  };

  const handleEdit = (estudiante) => {
    setFormData(estudiante);
    setEditingId(estudiante.id); // Suponiendo que el estudiante tiene un campo 'id'
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      try {
        await apiDelete(`/estudiante/${id}`);
        alert('Estudiante eliminado con éxito.');
        fetchEstudiantes(); // Refrescar la lista
      } catch (error) {
        console.error('Error eliminando estudiante:', error);
        alert('Hubo un problema, inténtalo nuevamente.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      carrera: '',
      universidad: '',
      habilidades: '',
      experiencia: '',
      authUserId: ''
    });
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Control de Estudiantes</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
          placeholder="Carrera"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="universidad"
          value={formData.universidad}
          onChange={handleChange}
          placeholder="Universidad"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="habilidades"
          value={formData.habilidades}
          onChange={handleChange}
          placeholder="Habilidades"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="experiencia"
          value={formData.experiencia}
          onChange={handleChange}
          placeholder="Experiencia"
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingId ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
        </button>
        <button type="button" onClick={resetForm} className="bg-red-500 text-white p-2 ml-2">
          Cancelar
        </button>
      </form>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Apellido</th>
            <th className="py-2">Carrera</th>
            <th className="py-2">Universidad</th>
            <th className="py-2">Habilidades</th>
            <th className="py-2">Experiencia</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td className="py-2 border">{estudiante.nombre}</td>
              <td className="py-2 border">{estudiante.apellido}</td>
              <td className="py-2 border">{estudiante.carrera}</td>
              <td className="py-2 border">{estudiante.universidad}</td>
              <td className="py-2 border">{estudiante.habilidades}</td>
              <td className="py-2 border">{estudiante.experiencia}</td>
              <td className="py-2 border">
                <button onClick={() => handleEdit(estudiante)} className="text-blue-500">
                  Editar
                </button>
                <button onClick={() => handleDelete(estudiante.id)} className="text-red-500 ml-2">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudianteCtrl;