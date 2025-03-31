import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../../services/GeneroService';
import Swal from 'sweetalert2';

const GeneroView = () => {
    const [valuesForm, setValuesForm] = useState({ name: '', descripcion: '' });
    const [generos, setGeneros] = useState([]);
    const [generoSelect, setGeneroSelect] = useState(null);

    const listGeneros = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const resp = await getGeneros();
            setGeneros(resp.data);
            Swal.close();
        } catch (error) {
            console.error('Error al obtener los géneros:', error.response?.data || error.message);
            Swal.close();
        }
    };

    useEffect(() => {
        listGeneros();
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value });
    };

    const handleCreateGenero = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Guardando...' });
            Swal.showLoading();

            if (generoSelect) {
                await updateGenero(generoSelect, valuesForm);
                setGeneroSelect(null);
            } else {
                await createGenero(valuesForm);
            }

            setValuesForm({ name: '', descripcion: '' });
            listGeneros();
            Swal.close();
        } catch (error) {
            console.error('Error al crear o actualizar el género:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar el género', 'error');
        }
    };

    const handleUpdateGenero = (genero) => {
        setValuesForm({ name: genero.name, descripcion: genero.descripcion });
        setGeneroSelect(genero._id);
    };

    const handleDeleteGenero = async (generoId) => {
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
                Swal.fire({ allowOutsideClick: false, text: 'Eliminando...' });
                Swal.showLoading();

                await deleteGenero(generoId);
                Swal.close();
                Swal.fire('Eliminado', 'El género ha sido eliminado correctamente', 'success');
                listGeneros();
            }
        } catch (error) {
            console.error('Error al eliminar el género:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', 'No se pudo eliminar el género', 'error');
        }
    };

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={handleCreateGenero}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                required
                                name='name'
                                value={valuesForm.name}
                                type="text"
                                className="form-control"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input
                                required
                                name='descripcion'
                                value={valuesForm.descripcion}
                                type="text"
                                className="form-control"
                                onChange={handleOnChange}
                            />
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
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {generos.map((genero, index) => (
                        <tr key={genero._id}>
                            <td>{index + 1}</td>
                            <td>{genero.name}</td>
                            <td>{genero.descripcion}</td>
                            <td>
                                <button
                                    className='btn btn-success btn-sm me-2'
                                    onClick={() => handleUpdateGenero(genero)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDeleteGenero(genero._id)}
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

export default GeneroView;
