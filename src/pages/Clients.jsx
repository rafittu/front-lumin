import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/Clients.css';

function ClientsList() {
  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

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

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <section>
      <Navbar />

      <div id="clients-container">
        <div id="client-list">
          <ul>
            {clients.map((client) => (
              <li key={client.id}>
                <button type="button" onClick={() => handleClientClick(client)}>
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
                {/* Renderize os agendamentos do cliente aqui */}
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
