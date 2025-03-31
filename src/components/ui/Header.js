import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Peliculas</NavLink>
        

            
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/Director">Director</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Genero">Genero</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Media">Media</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Productora">Productora</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Tipo">Tipo</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
