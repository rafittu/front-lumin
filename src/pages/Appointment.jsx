import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

        console.log(response.data.appointments[0]);
        console.log(appointment);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  return (
    <div>
      <h2>Detalhes do Compromisso:</h2>
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
  );
}

export default AppointmentDetails;
