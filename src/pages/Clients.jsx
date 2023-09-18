import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ClientsList() {
  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [clients, setClients] = useState([]);

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
  }, []);

  return (
    <section>
      <Navbar />

      <div className="clients-container">
        <div id="client-list">
          <ul>
            {clients.map((client) => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
        </div>

        <div id="client-details">
          <span>
            After click on a user from list, render user details (name, phone)
            on upper center/right content-container
          </span>
        </div>

        <div id="client-appointments">
          <span>
            After click on a user from list, render user schedule appointments
            on bottom center content-container
          </span>
        </div>

        <div id="client-payments">
          <span>
            After click on a user from list, render user payment history on
            bottom right content-container
          </span>
        </div>
      </div>
    </section>
  );
}

export default ClientsList;
