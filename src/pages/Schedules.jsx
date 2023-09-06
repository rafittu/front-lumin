import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentForm from '../components/AppointmentForm';

import '../style/Schedules.css';

function Schedules() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

        setAppointments(response.data.appointments);
      } catch (error) {
        console.log(error.response.data);
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

        {!showForm ? (
          <button type="button" onClick={() => setShowForm(true)}>
            Criar Novo Compromisso
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default Schedules;
