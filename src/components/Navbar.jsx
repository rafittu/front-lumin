import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/home">Inicio</Link>
      <Link to="/schedule">Agenda</Link>
      <Link to="/clients">Clientes</Link>
      <Link to="/records">Fichas</Link>
    </nav>
  );
}

export default Navbar;
