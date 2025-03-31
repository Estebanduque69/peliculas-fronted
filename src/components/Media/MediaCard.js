import React from 'react';

export const MediaCard = (props) => {
    const { media, handleOpenModal, handleDeleteMedia } = props;

    return (
        <div className="col">
            <div className="card">
                <img
                    src={media.imagen || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={media.titulo || 'Media'}
                />
                <div className="card-body">
                    <h5 className="card-title">Detalles de la Media</h5>
                    <hr />
                    <p className="card-text">{`Título: ${media.titulo || 'N/A'}`}</p>
                    <p className="card-text">{`Género: ${media.genero?.name || 'N/A'}`}</p>
                    <p className="card-text">{`Director: ${media.director?.nombres || 'N/A'}`}</p>
                    <p className="card-text">{`Productora: ${media.productora?.name || 'N/A'}`}</p>
                    <p className="card-text">{`Tipo: ${media.tipo?.name || 'N/A'}`}</p>
                    <p className="card-text">{`Año de Estreno: ${media.anioEstreno || 'N/A'}`}</p>
                    <p className="card-text">{`Sinopsis: ${media.sinopsis || 'N/A'}`}</p>
                    <p className="card-text">
                        <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal(media)}>
                            Editar
                        </button>
                        <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => handleDeleteMedia(media._id)}
                        >
                            Eliminar
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};