import React, { useState, useEffect } from 'react';
import { createTipo, getTipos, updateTipo } from '../../services/TipoService';
import Swal from 'sweetalert2';
const moment = require('moment');

const TipoView = () => {
  const [valuesForm, setValuesForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { name = '', state = '' } = valuesForm;
  const [tipoSelect, setTipoSelect] = useState(null);

  const listTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipos();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listTipos();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...'
      });
      Swal.showLoading();
      if (tipoSelect) {
        await updateTipo(tipoSelect, valuesForm);
        setTipoSelect(null);
      } else {
        await createTipo(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listTipos();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleUpdateTipo = async (e, tipo) => {
    e.preventDefault();
    setValuesForm({ name: tipo.name, state: tipo.state });
    setTipoSelect(tipo._id);
  };

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateTipo(e)}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                required
                name='name'
                value={name}
                type="text"
                className="form-control"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                required
                name='state'
                value={state}
                className="form-select"
                onChange={(e) => handleOnChange(e)}
              >
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.length > 0 &&
            tipos.map((tipo, index) => {
              return (
                <tr key={tipo._id}>
                  <th scope='row'> {index + 1} </th>
                  <td> {tipo.name} </td>
                  <td> {tipo.state} </td>
                  <td> {moment(tipo.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                  <td> {moment(tipo.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                  <td>
                    <button
                      className='btn btn-success btn-sm me-2'
                      onClick={(e) => handleUpdateTipo(e, tipo)}
                    >
                      Actualizar
                    </button>
                    <button className='btn btn-danger btn-sm'>Eliminar</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TipoView;
