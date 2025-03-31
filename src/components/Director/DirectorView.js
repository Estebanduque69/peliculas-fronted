import React, { useState, useEffect } from 'react';
import { createDirector, getDirectors, updateDirector, deleteDirector } from '../../services/DirectorService';
import Swal from 'sweetalert2';
const moment = require('moment');

const DirectorView = () => {
    const [valuesForm, setValuesForm] = useState({ nombres: '', estado: '' });
    const [directors, setDirectors] = useState([]);
    const [directorSelect, setDirectorSelect] = useState(null);

    // Función para listar todos los directores
    const listDirectors = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const resp = await getDirectors();
            setDirectors(resp.data);
            Swal.close();
        } catch (error) {
            console.error('Error al obtener los directores:', error.response?.data || error.message);
            Swal.close();
        }
    };

    useEffect(() => {
        listDirectors();
    }, []);

    // Manejar cambios en el formulario
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value });
    };

    // Crear o actualizar un director
    const handleCreateDirector = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Guardando...'
            });
            Swal.showLoading();

            if (directorSelect) {
                await updateDirector(directorSelect, valuesForm);
                setDirectorSelect(null);
            } else {
                await createDirector(valuesForm);
            }

            setValuesForm({ nombres: '', estado: '' });
            listDirectors(); // Actualiza la lista de directores
            Swal.close();
        } catch (error) {
            console.error('Error al crear o actualizar el director:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar el director', 'error');
        }
    };

    // Seleccionar un director para editar
    const handleUpdateDirector = (director) => {
        setValuesForm({ nombres: director.nombres, estado: director.estado });
        setDirectorSelect(director._id);
    };

    // Eliminar un director
    const handleDeleteDirector = async (directorId) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (confirm.isConfirmed) {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Eliminando...'
                });
                Swal.showLoading();

                await deleteDirector(directorId);
                Swal.close();
                Swal.fire('Eliminado', 'El director ha sido eliminado correctamente', 'success');
                listDirectors(); // Actualiza la lista de directores
            }
        } catch (error) {
            console.error('Error al eliminar el director:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', 'No se pudo eliminar el director', 'error');
        }
    };

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={handleCreateDirector}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                required
                                name='nombres'
                                value={valuesForm.nombres}
                                type="text"
                                className="form-control"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select
                                required
                                name='estado'
                                value={valuesForm.estado}
                                className="form-select"
                                onChange={handleOnChange}
                            >
                                <option value="">--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary mb-3">Guardar</button>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Actualización</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {directors.map((director, index) => (
                        <tr key={director._id}>
                            <td>{index + 1}</td>
                            <td>{director.nombres}</td>
                            <td>{director.estado}</td>
                            <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                            <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                            <td>
                                <button
                                    className='btn btn-success btn-sm me-2'
                                    onClick={() => handleUpdateDirector(director)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDeleteDirector(director._id)}
                                >
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

export default DirectorView;