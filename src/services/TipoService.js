import { axiosInstance } from '../helper/axios-config';

// Obtener todos los types
const getTipos = () => {
    return axiosInstance.get('types', {
        headers: { 'Content-type': 'application/json' }
    });
};

// Crear un nuevo tipo
const createTipo = (data) => {
    return axiosInstance.post('types', data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Actualizar un tipo existente
const updateTipo = (tipoId, data) => {
    return axiosInstance.put(`types/${tipoId}`, data, {
        headers: { 'Content-type': 'application/json' }
    });
};

// Eliminar un tipo
const deleteTipo = (tipoId) => {
    return axiosInstance.delete(`types/${tipoId}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

export { getTipos, createTipo, updateTipo, deleteTipo };