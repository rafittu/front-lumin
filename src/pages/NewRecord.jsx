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
      console.error(error.response.data);
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
          <div>
            <label htmlFor="comments">
              Comentários:
              <textarea
                id="comments"
                name="comments"
                value={record}
                onChange={(e) => setRecord(e.target.value)}
                placeholder="Adicione seus comentários aqui..."
                rows="12"
              />
            </label>
          </div>
          <div>
            <button type="submit">Salvar Registro</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewRecord;
