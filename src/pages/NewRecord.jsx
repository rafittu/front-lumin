import React from 'react';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

function NewRecord() {
  const { appointmentData } = useAppointment();
  const { clientName, clientPhone, appointmentDate } = appointmentData;

  if (!appointmentData) {
    return (
      <div>
        <p>Carregando dados para atendimento...</p>
      </div>
    );
  }

  return (
    <section>
      <Navbar />

      <div id="record-container">
        <h1>Novo Registro de Atendimento</h1>

        <form>
          <div>
            <label htmlFor="clientName">
              Nome do Cliente:
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={clientName}
                readOnly
              />
            </label>
          </div>
          <div>
            <label htmlFor="clientPhone">
              Telefone:
              <input
                type="text"
                id="clientPhone"
                name="clientPhone"
                value={clientPhone}
                readOnly
              />
            </label>
          </div>
          <div>
            <label htmlFor="appointmentDate">
              Data do Atendimento:
              <input
                type="text"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentDate}
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
