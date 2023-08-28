import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Navbar.css';

function Navbar() {
  const user = {
    status: 'PENDING_CONFIRMATION',
  }; // Get user status from context created on home page

  return (
    <nav>
      <Link to="/home">Inicio</Link>
      <Link
        to="/schedule"
        className={user.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Agenda
      </Link>
      <Link
        to="/clients"
        className={user.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Clientes
      </Link>
      <Link
        to="/records"
        className={user.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Fichas
      </Link>
    </nav>
  );
}

export default Navbar;
