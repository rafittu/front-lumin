import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

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

        setAppointments(response.data.appointments);
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
