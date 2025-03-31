import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../../services/ProductoraService';
import Swal from 'sweetalert2';

const ProductoraView = () => {
    const [valuesForm, setValuesForm] = useState({ name: '', descripcion: '' });
    const [productoras, setProductoras] = useState([]);
    const [productoraSelect, setProductoraSelect] = useState(null);

    // Función para listar todas las productoras
    const listProductoras = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const resp = await getProductoras();
            setProductoras(resp.data);
            Swal.close();
        } catch (error) {
            console.error('Error al obtener las productoras:', error.response?.data || error.message);
            Swal.close();
        }
    };

    useEffect(() => {
        listProductoras();
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value });
    };

    const handleCreateProductora = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Guardando...' });
            Swal.showLoading();

            if (productoraSelect) {
                await updateProductora(productoraSelect, valuesForm);
                setProductoraSelect(null);
            } else {
                await createProductora(valuesForm);
            }

            setValuesForm({ name: '', descripcion: '' });
            listProductoras();
            Swal.close();
        } catch (error) {
            console.error('Error al crear o actualizar la productora:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar la productora', 'error');
        }
    };

    const handleUpdateProductora = (productora) => {
        setValuesForm({ name: productora.name, descripcion: productora.descripcion });
        setProductoraSelect(productora._id);
    };

    const handleDeleteProductora = async (productoraId) => {
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

                await deleteProductora(productoraId);
                Swal.close();
                Swal.fire('Eliminado', 'La productora ha sido eliminada correctamente', 'success');
                listProductoras();
            }
        } catch (error) {
            console.error('Error al eliminar la productora:', error.response?.data || error.message);
            Swal.close();
            Swal.fire('Error', 'No se pudo eliminar la productora', 'error');
        }
    };

    return (
        <div className='container-fluid mt-4'>
            <form onSubmit={handleCreateProductora}>
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
                    {productoras.map((productora, index) => (
                        <tr key={productora._id}>
                            <td>{index + 1}</td>
                            <td>{productora.name}</td>
                            <td>{productora.descripcion}</td>
                            <td>
                                <button
                                    className='btn btn-success btn-sm me-2'
                                    onClick={() => handleUpdateProductora(productora)}
                                >
                                    Actualizar
                                </button>
                                <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDeleteProductora(productora._id)}
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

export default ProductoraView;