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

  return (
    <section>
      <Navbar />
    </section>
  );
}

export default AppointmentsByDate;
