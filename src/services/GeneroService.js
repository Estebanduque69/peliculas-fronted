import { axiosInstance } from '../helper/axios-config';

// Obtener todos los géneros
const getGeneros = () => {
    return axiosInstance.get('genres', {
        headers: { 'Content-type': 'application/json' }
    });
};

// Crear un nuevo género
const createGenero = (data) => {
    return axiosInstance.post('genres', data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Actualizar un género existente
const updateGenero = (generoId, data) => {
    return axiosInstance.put(`genres/${generoId}`, data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Eliminar un género
const deleteGenero = (generoId) => {
    return axiosInstance.delete(`genres/${generoId}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

export { getGeneros, createGenero, updateGenero, deleteGenero };