import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

import '../style/ShowRecord.css';

function ShowRecord() {
  const { recordId } = useParams();

  const [record, setRecord] = useState('');
  const [apiErrors, setApiErros] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleUpdateRecord = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/record/update/${recordId}`,
        {
          record: record.record,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setRecord({ ...record, record: response.data.record });
      setIsEditing(false);
    } catch (error) {
      setApiErros('Falha ao atualizar o registro');
    }
  };

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
                  {formatDate(record.scheduledDate)}
                </p>
              </div>
              <div id="record-content">
                {isEditing ? (
                  <textarea
                    value={record.record}
                    onChange={(e) => setRecord({ ...record, record: e.target.value })}
                  />
                ) : (
                  <p>{record.record}</p>
                )}
                {isEditing && (
                  <button type="button" onClick={handleUpdateRecord}>Atualizar</button>
                )}
              </div>
            </div>
            <div className="inputs-buttons">
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar Edição' : 'Editar Ficha'}
              </button>
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
