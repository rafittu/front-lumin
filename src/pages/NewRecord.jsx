import React from 'react';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

import '../style/NewRecord.css';

function NewRecord() {
  const { appointmentData } = useAppointment();
  const { clientName, appointmentDate } = appointmentData;

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

  return (
    <section>
      <Navbar />

      <div id="record-container">
        <h1>Novo Registro de Atendimento</h1>

        <form>
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
                placeholder="Adicione seus comentários aqui..."
                rows="4"
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
