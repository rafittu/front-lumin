import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

import '../style/NewRecord.css';

function ShowRecord() {
  const { recordId } = useParams();

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

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/record/${recordId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              professionalId: userData.id,
            },
          },
        );

        setRecord(response.data);
      } catch (error) {
        setApiErros('falha ao carregar ficha de atendimento');
      }
    };

    fetchRecord();
  }, []);

  return (
    <section>
      <Navbar />

      <div id="record-container">
        <h1>Registro de Atendimento</h1>

        {apiErrors && <div className="error-message">{apiErrors}</div>}
      </div>
    </section>
  );
}

export default ShowRecord;
