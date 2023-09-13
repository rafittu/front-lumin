import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/AppointmentsByDate.css';

function AppointmentsByDate() {
  const { date } = useParams();
  const [appointments, setAppointments] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/schedules/professional/filter/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              appointmentDate: date,
            },
          },
        );

        const sortedAppointments = response.data.appointments.sort((a, b) => {
          const [hoursA, minutesA] = a.appointmentTime.split(':').map(Number);
          const [hoursB, minutesB] = b.appointmentTime.split(':').map(Number);

          if (hoursA !== hoursB) {
            return hoursA - hoursB;
          }

          return minutesA - minutesB;
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchAppointments();
  }, [date]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <Navbar />

      <div id="schedule-container">
        <h1>
          Agenda do dia -
          {' '}
          {formatDate(date)}
        </h1>

        <div id="today-appointments">
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <a href={`/appointment/${appointment.id}`}>
                  {appointment.clientName}
                  {' '}
                  -
                  {' '}
                  {appointment.appointmentTime}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AppointmentsByDate;
