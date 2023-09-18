import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

import '../style/NewRecord.css';

function NewRecord() {
  const navigate = useNavigate();
  const { appointmentData } = useAppointment();
  const { clientName, appointmentDate, id } = appointmentData;
  const appointmentId = id;

  const [record, setRecord] = useState('');
  const [apiErrors, setApiErros] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!appointmentData) {
    return (
      <div>
        <p>Carregando dados para atendimento...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        record,
      };

      const response = await axios.post(
        'http://localhost:3001/record/create',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            professionalId: userData.id,
            appointmentId,
          },
        },
      );

      navigate(`/record/${response.data.recordId}`);
    } catch (error) {
      setApiErros('ficha de atendimento só pode ser criada na data da consulta');
    }
  };

  return (
    <section>
      <Navbar />

      <div id="record-container">
        <h1>Novo Registro de Atendimento</h1>

        <form onSubmit={handleSubmit}>
          <div id="record-header">
            <label htmlFor="clientName">
              Cliente:
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={clientName}
                readOnly
              />
            </label>

            <label htmlFor="appointmentDate">
              Data do Atendimento:
              <input
                type="text"
                id="appointmentDate"
                name="appointmentDate"
                value={formatDate(appointmentDate)}
                readOnly
              />
            </label>
          </div>
          <div id="input-record">
            <label htmlFor="comments">
              <textarea
                id="comments"
                name="comments"
                value={record}
                onChange={(e) => setRecord(e.target.value)}
                placeholder="Relato do atendimento"
                rows="12"
              />
            </label>
          </div>

          {apiErrors && (
          <div className="error-message">{apiErrors}</div>
          )}

          <div id="record-button">
            <button type="submit">Salvar Registro</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewRecord;
