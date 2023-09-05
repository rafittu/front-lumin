import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

import '../style/Navbar.css';

function Navbar() {
  const { userData } = useUser();

  return (
    <nav>
      <Link to="/home">Inicio</Link>
      <Link
        to="/schedules"
        className={userData.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Agenda
      </Link>
      <Link
        to="/clients"
        className={userData.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Clientes
      </Link>
      <Link
        to="/records"
        className={userData.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Fichas
      </Link>
      <Link
        to="/payments"
        className={userData.status !== 'ACTIVE' ? 'disabled' : ''}
      >
        Financeiro
      </Link>
    </nav>
  );
}

export default Navbar;
