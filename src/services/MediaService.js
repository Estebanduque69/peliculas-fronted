import { axiosInstance } from "../helper/axios-config";

// Obtener todas las medias
const getMedias = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

// Obtener una media por ID
const getMediaById = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

// Crear una nueva media
const createMedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

// Actualizar una media existente
const updateMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

// Eliminar una media por ID
const deleteMedia = (mediaId) => {
    return axiosInstance.delete(`media/${mediaId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

export {
    getMedias,
    getMediaById,
    createMedia,
    updateMedia,
    deleteMedia
};