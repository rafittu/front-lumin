import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentForm from '../components/AppointmentForm';

import '../style/Schedules.css';

function Schedules() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [apiErrors, setApiErros] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/schedules/professional/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const sortedAppointments = response.data.appointments.sort((a, b) => {
          const dateA = new Date(a.appointmentDate);
          const dateB = new Date(b.appointmentDate);
          return dateA - dateB;
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        setApiErros('falha ao carregar agenda');
      }
    };

    fetchAppointmentsData();
  }, [accessToken, userData.id]);

  return (
    <section>
      <Navbar />

      <div id="schedule-container">
        <h1>Agenda de Compromissos</h1>
        <AppointmentCalendar appointments={appointments} />

        {showForm ? <AppointmentForm /> : null}

        {apiErrors && (
          <div className="error-message">{apiErrors}</div>
        )}

        <div className="inputs-buttons">
          {!showForm ? (
            <button type="button" onClick={() => setShowForm(true)}>
              Criar Novo Compromisso
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Schedules;
