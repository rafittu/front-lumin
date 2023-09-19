import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/Clients.css';

function ClientsList() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/professional/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setClients(response.data.clients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, [accessToken, userData.id]);

  const fetchClientAppointments = async (client) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/schedules/professional/filter/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            clientName: client.name,
          },
        },
      );

      const sortedAppointments = response.data.appointments.sort((a, b) => {
        const dateA = new Date(a.scheduledDate);
        const dateB = new Date(b.scheduledDate);

        return dateA - dateB;
      });

      setAppointments(sortedAppointments);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);

    fetchClientAppointments(client);
  };

  const filteredClients = clients.filter((client) => client
    .name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAppointmentClick = async (appointment) => {
    const appointmentTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
    const currentTime = new Date();

    if (currentTime - appointmentTime > 1 * 60 * 60 * 1000) {
      try {
        const response = await axios.get(
          `http://localhost:3001/record/filter/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              appointmentId: appointment.id,
            },
          },
        );

        navigate(`/record/${response.data.recordId}`);
      } catch (error) {
        console.log(error.response);
      }

      return;
    }

    navigate(`/appointment/${appointment.id}`);
  };

  return (
    <section>
      <Navbar />

      <div id="clients-container">
        <div id="client-list">
          <input
            type="text"
            placeholder="Pesquisar cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul>
            {filteredClients.map((client) => (
              <li key={client.id}>
                <button
                  type="button"
                  onClick={() => handleClientClick(client)}
                >
                  {client.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div id="selected-client">
          <div id="client-details">
            {selectedClient ? (
              <>
                <p>
                  <strong>Nome:</strong>
                  {' '}
                  {selectedClient.name}
                </p>
                <p>
                  <strong>Telefone:</strong>
                  {' '}
                  {selectedClient.phone}
                </p>
              </>
            ) : null}
          </div>

          <div id="client-appointments">
            {selectedClient ? (
              <>
                <h2>Agendamentos</h2>
                {appointments.map((appointment) => (
                  <li key={appointment.id}>
                    <button type="button" onClick={() => handleAppointmentClick(appointment)}>{appointment.appointmentDate}</button>
                  </li>
                ))}
              </>
            ) : null}
          </div>

          <div id="client-payments">
            {selectedClient ? (
              <>
                <h2>Histórico de Pagamentos</h2>
                {/* Renderize o histórico de pagamentos do cliente aqui */}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsList;
