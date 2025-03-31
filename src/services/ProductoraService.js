import { axiosInstance } from '../helper/axios-config';

// Obtener todas las productoras
const getProductoras = () => {
    return axiosInstance.get('producers', {
        headers: { 'Content-type': 'application/json' }
    });
};

// Crear una nueva productora
const createProductora = (data) => {
    return axiosInstance.post('producers', data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Actualizar una productora existente
const updateProductora = (productoraId, data) => {
    return axiosInstance.put(`producers/${productoraId}`, data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Eliminar una productora
const deleteProductora = (productoraId) => {
    return axiosInstance.delete(`producers/${productoraId}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

export { getProductoras, createProductora, updateProductora, deleteProductora };