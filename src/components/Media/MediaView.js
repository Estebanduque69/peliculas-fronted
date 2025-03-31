import React, { useState, useEffect } from 'react';
import '../../Style.css'; // Ruta corregida para apuntar al archivo en la carpeta src
import { MediaCard } from './MediaCard';
import MediaNew from './MediaNew';
import Swal from 'sweetalert2';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../../services/MediaService';
import { getGeneros } from '../../services/GeneroService';
import { getDirectors } from '../../services/DirectorService';
import { getProductoras } from '../../services/ProductoraService';
import { getTipos } from '../../services/TipoService';

const MediaView = () => {
  const [medias, setMedias] = useState([]); // Lista de medias
  const [openModal, setOpenModal] = useState(false); // Control del modal
  const [generos, setGeneros] = useState([]); // Lista de géneros
  const [directores, setDirectores] = useState([]); // Lista de directores
  const [productoras, setProductoras] = useState([]); // Lista de productoras
  const [tipos, setTipos] = useState([]); // Lista de tipos
  const [selectedMedia, setSelectedMedia] = useState(null); // Media seleccionada para editar

  // Función para listar las medias
  const listMedias = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getMedias();
      Swal.close();
      setMedias(data); // Actualiza el estado con las medias obtenidas
    } catch (error) {
      console.error('Error al cargar las medias:', error);
      Swal.close();
    }
  };

  // Función para listar los géneros
  const listGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data); // Actualiza el estado con los géneros obtenidos
    } catch (error) {
      console.error('Error al cargar los géneros:', error);
    }
  };

  // Función para listar los directores
  const listDirectores = async () => {
    try {
        const { data } = await getDirectors();
        setDirectores(data);
    } catch (error) {
        console.error('Error al cargar los directores:', error);
    }
  };

  // Función para listar las productoras
  const listProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data); // Actualiza el estado con las productoras obtenidas
    } catch (error) {
      console.error('Error al cargar las productoras:', error);
    }
  };

  // Función para listar los tipos
  const listTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data); // Actualiza el estado con los tipos obtenidos
    } catch (error) {
      console.error('Error al cargar los tipos:', error);
    }
  };

  // Función para crear una nueva media
  const handleCreateMedia = async (mediaData) => {
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Guardando...'
        });
        Swal.showLoading();

        await createMedia(mediaData); // Llama al servicio para crear una nueva media
        Swal.close();
        Swal.fire('Éxito', 'La media ha sido creada correctamente', 'success');
        listMedias(); // Actualiza la lista de medias después de crear una nueva
        handleOpenModal(); // Cierra el modal
    } catch (error) {
        console.error('Error al crear la media:', error.response?.data || error.message);
        Swal.close();
        Swal.fire('Error', error.response?.data?.message || 'No se pudo crear la media', 'error');
    }
  };

  // Función para actualizar una media existente
  const handleUpdateMedia = async (mediaId, mediaData) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Actualizando...'
      });
      Swal.showLoading();
      await updateMedia(mediaId, mediaData); // Llama al servicio para actualizar la media
      Swal.close();
      listMedias(); // Actualiza la lista de medias después de actualizar
      handleOpenModal(); // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar la media:', error);
      Swal.close();
    }
  };

  // Función para eliminar una media existente
  const handleDeleteMedia = async (mediaId) => {
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
        Swal.fire({
          allowOutsideClick: false,
          text: 'Eliminando...'
        });
        Swal.showLoading();
        await deleteMedia(mediaId);
        Swal.close();
        listMedias(); // Actualiza la lista después de eliminar
        Swal.fire('Eliminado', 'La media ha sido eliminada', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la media:', error);
      Swal.fire('Error', 'No se pudo eliminar la media', 'error');
    }
  };

  // Función para abrir/cerrar el modal
  const handleOpenModal = (media = null) => {
    setSelectedMedia(media); // Establece la media seleccionada (si existe)
    setOpenModal(!openModal); // Alterna el estado del modal
  };

  // Efecto para cargar las medias, géneros, directores, productoras y tipos al montar el componente
  useEffect(() => {
    listMedias();
    listGeneros();
    listDirectores();
    listProductoras();
    listTipos();
  }, []);

  return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => (
            <MediaCard 
              key={media._id} 
              media={media} 
              handleOpenModal={handleOpenModal} // Pasa la función para editar
              handleDeleteMedia={handleDeleteMedia} // Pasa la función para eliminar
            />
          ))
        }
      </div>
      {
        openModal ? (
          <MediaNew
            handleOpenModal={handleOpenModal}
            handleCreateMedia={handleCreateMedia}
            handleUpdateMedia={handleUpdateMedia}
            generos={generos}
            directores={directores}
            productoras={productoras}
            tipos={tipos}
            selectedMedia={selectedMedia} // Pasa la media seleccionada para editar
          />
        ) : (
          <button className="newInv" onClick={() => handleOpenModal()}>
            +
          </button>
        )
      }
    </div>
  );
};

export default MediaView;
