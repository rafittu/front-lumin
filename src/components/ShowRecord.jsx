import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

import '../style/ShowRecord.css';

function ShowRecord() {
  const { recordId } = useParams();

  const [record, setRecord] = useState('');
  const [apiErrors, setApiErros] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

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
  }, [recordId, accessToken, userData.id]);

  return (
    <section>
      <Navbar />

      <div id="record">
        {record ? (
          <>
            <h1>Registro de Atendimento</h1>
            <div id="record-header">
              <div id="client-info">
                <p>
                  <strong>Nome do Cliente:</strong>
                  {' '}
                  {record.clientName}
                </p>
                <p>
                  <strong>Data do Atendimento:</strong>
                  {' '}
                  {record.scheduledDate}
                </p>
              </div>
              <div id="record-content">
                <p>{record.record}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando ficha de atendimento...</p>
        )}

        {apiErrors && <div className="error-message">{apiErrors}</div>}
      </div>
    </section>
  );
}

export default ShowRecord;
