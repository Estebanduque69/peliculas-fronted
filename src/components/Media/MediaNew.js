import React, { useState, useEffect } from 'react';

const MediaNew = ({ handleOpenModal, handleCreateMedia, handleUpdateMedia, generos, directores, productoras, tipos, selectedMedia }) => {
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

    // Inicializa los valores del formulario si se selecciona una media para editar
    useEffect(() => {
        if (selectedMedia) {
            setValoresForm(selectedMedia);
        } else {
            setValoresForm({
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
        }
    }, [selectedMedia]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // Validación de campos requeridos
        if (!serial || !titulo || !sinopsis || !url || !imagen || !anioEstreno || !genero || !director || !productora || !tipo) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const mediaData = {
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

        console.log('Datos enviados:', mediaData); // Depuración: verifica los datos enviados

        if (selectedMedia) {
            handleUpdateMedia(selectedMedia._id, mediaData); // Actualiza la media existente
        } else {
            handleCreateMedia(mediaData); // Crea una nueva media
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>{selectedMedia ? 'Editar Media' : 'Nueva Media'}</h3>
                <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
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
                    <select
                        name="genero"
                        value={genero}
                        onChange={handleOnChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Seleccione --</option>
                        {generos.map((g) => (
                            <option key={g._id} value={g._id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Director</label>
                    <select
                        name="director"
                        value={director}
                        onChange={handleOnChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Seleccione --</option>
                        {directores.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.nombres}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Productora</label>
                    <select
                        name="productora"
                        value={productora}
                        onChange={handleOnChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Seleccione --</option>
                        {productoras.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select
                        name="tipo"
                        value={tipo}
                        onChange={handleOnChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Seleccione --</option>
                        {tipos.map((t) => (
                            <option key={t._id} value={t._id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedMedia ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </div>
    );
};

export default MediaNew;