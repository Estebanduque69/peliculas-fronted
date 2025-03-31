import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaById, updateMedia } from '../../services/MediaService';
import Swal from 'sweetalert2';

const MediaUpdate = () => {
    const { mediaId } = useParams();
    const [valoresForm, setValoresForm] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anioEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    const { serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = valoresForm;

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const { data } = await getMediaById(mediaId);
                setValoresForm(data);
            } catch (error) {
                console.error('Error al cargar la media:', error);
            }
        };

        fetchMedia();
    }, [mediaId]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const updatedMedia = {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            anioEstreno,
            genero,
            director,
            productora,
            tipo
        };

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Guardando...'
            });
            Swal.showLoading();
            await updateMedia(mediaId, updatedMedia);
            Swal.close();
        } catch (error) {
            console.error('Error al actualizar la media:', error);
            Swal.close();
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label className="form-label">Serial</label>
                    <input
                        type="text"
                        name="serial"
                        value={serial}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={titulo}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Sinopsis</label>
                    <textarea
                        name="sinopsis"
                        value={sinopsis}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">URL</label>
                    <input
                        type="url"
                        name="url"
                        value={url}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="url"
                        name="imagen"
                        value={imagen}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Año de Estreno</label>
                    <input
                        type="number"
                        name="anioEstreno"
                        value={anioEstreno}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <input
                        type="text"
                        name="genero"
                        value={genero}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={director}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Productora</label>
                    <input
                        type="text"
                        name="productora"
                        value={productora}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <input
                        type="text"
                        name="tipo"
                        value={tipo}
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
    );
};

export default MediaUpdate;