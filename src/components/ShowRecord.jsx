import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import '../style/NewRecord.css';

function ShowRecord() {
  const [record, setRecord] = useState('');
  const [apiErrors, setApiErros] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!record) {
    return (
      <div>
        <p>Carregando ficha de atendimento...</p>
      </div>
    );
  }

  return (
    <section>
      <Navbar />

      <div id="record-container">
        <h1>Registro de Atendimento</h1>
      </div>
    </section>
  );
}

export default ShowRecord;
