import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

function NewRecord() {
  const { appointmentId } = useParams();
  const { appointmentData } = useAppointment();

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
