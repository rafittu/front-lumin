import React from 'react';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

function NewRecord() {
  const { appointmentData } = useAppointment();

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

      <div className="content-container">
        <span>new record form</span>
      </div>
    </section>
  );
}

export default NewRecord;
