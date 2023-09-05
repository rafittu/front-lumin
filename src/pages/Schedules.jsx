import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import AppointmentCalendar from '../components/AppointmentCalendar';

import '../style/Schedules.css';

function Schedules() {
  const { userData } = useUser();
  const [appointments, setAppointments] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

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

      <div className="content-container">
        <h1>Agenda de Compromissos</h1>
        <AppointmentCalendar appointments={appointments} />
      </div>
    </section>
  );
}

export default Schedules;
