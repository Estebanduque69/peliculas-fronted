import { axiosInstance } from '../helper/axios-config';

// Obtener todos los directores
const getDirectors = () => {
    return axiosInstance.get('directors', {
        headers: { 'Content-type': 'application/json' }
    });
};

// Crear un nuevo director
const createDirector = (data) => {
    return axiosInstance.post('directors', data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Actualizar un director existente
const updateDirector = (directorId, data) => {
    return axiosInstance.put(`directors/${directorId}`, data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Eliminar un director
const deleteDirector = (directorId) => {
    return axiosInstance.delete(`directors/${directorId}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

export { getDirectors, createDirector, updateDirector, deleteDirector };