import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/AppointmentDetails.css';

function AppointmentDetails() {
  const navigate = useNavigate();
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

  const redirect = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <Navbar />

      <div id="schedule-container">
        <h1>Detalhes do agendamento</h1>
        <div id="appointment-details">
          <p className="detail-label">
            Cliente:
            <span className="detail-value">{appointment.clientName}</span>
          </p>
          <p className="detail-label">
            Data:
            <span className="detail-value">
              {formatDate(appointment.appointmentDate)}
            </span>
          </p>
          <p className="detail-label">
            Hora:
            <span className="detail-value">{appointment.appointmentTime}</span>
          </p>
          <p className="detail-label">
            Telefone para contato:
            <span className="detail-value">{appointment.clientPhone}</span>
          </p>
        </div>

        <div className="inputs-buttons">
          <button type="button" onClick={redirect}>
            Voltar
          </button>
        </div>
      </div>
    </section>
  );
}

export default AppointmentDetails;
