import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Navbar.css';

function Navbar() {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <nav>
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
    </nav>
  );
}

export default Navbar;
