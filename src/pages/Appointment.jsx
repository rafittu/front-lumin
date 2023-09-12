import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/AppointmentDetails.css';

function AppointmentDetails() {
  const { id } = useParams();
  const appointmentId = id;
  const [appointment, setAppointment] = useState(null);

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/schedules/professional/filter/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              appointmentId,
            },
          },
        );

        setAppointment(response.data.appointments[0]);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  if (!appointment) {
    return <div>Carregando detalhes do compromisso...</div>;
  }

  return (
    <section>
      <Navbar />

      <div id="schedule-container">
        <h1>Detalhes do agendamento:</h1>
        <div id="appointment-details">
          <p>
            Cliente:
            {' '}
            {appointment.clientName}
          </p>
          <p>
            Data:
            {' '}
            {appointment.appointmentDate}
          </p>
          <p>
            Hora:
            {' '}
            {appointment.appointmentTime}
          </p>
          <p>
            Telefone para contato:
            {' '}
            {appointment.clientPhone}
          </p>
        </div>

        <div className="inputs-buttons">
          <button type="button">
            Voltar
          </button>
        </div>
      </div>
    </section>
  );
}

export default AppointmentDetails;
