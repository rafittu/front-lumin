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
  const [payments, setPayments] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [appointmentFilter, setAppointmentFilter] = useState('all');

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatStatus = (status) => (status === 'OPEN' ? 'em aberto' : 'pago');

  const formatAppointments = (appointmentList) => {
    if (appointmentFilter === 'all') {
      return appointmentList;
    }

    if (appointmentFilter === 'past') {
      const currentDate = new Date();
      return appointmentList.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return appointmentDate <= currentDate;
      });
    }

    if (appointmentFilter === 'scheduled') {
      const currentDate = new Date();
      return appointmentList.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        return appointmentDate > currentDate;
      });
    }

    return appointmentList;
  };

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

  const fetchClientPayments = async (client) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/payment/get/filter/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            clientName: client.name,
          },
        },
      );

      const sortedPayments = response.data.payments.sort((a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);

        return dateA - dateB;
      });

      setPayments(sortedPayments);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);

    fetchClientAppointments(client);
    fetchClientPayments(client);
  };

  const filteredClients = clients.filter((client) => client
    .name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAppointmentClick = async (appointment) => {
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
      navigate(`/appointment/${appointment.id}`);
    }
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
                  id="client-list-btn"
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

                <div id="appointment-filter">
                  <label htmlFor="filterAppointments">
                    Filtrar por:
                    <select
                      name="filterAppointments"
                      id="filterAppointments"
                      value={appointmentFilter}
                      onChange={(e) => setAppointmentFilter(e.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="past">Passados</option>
                      <option value="scheduled">Agendados</option>
                    </select>
                  </label>
                </div>
                {formatAppointments(appointments).map((appointment) => (
                  <li key={appointment.id}>
                    <button id="client-list-btn" type="button" onClick={() => handleAppointmentClick(appointment)}>{formatDate(appointment.appointmentDate)}</button>
                  </li>
                ))}
              </>
            ) : null}
          </div>

          <div id="client-payments">
            {selectedClient ? (
              <>
                <h2>Histórico de Pagamentos</h2>

                <div id="payment-filter">
                  <label htmlFor="filterOptions">
                    Filtrar por:
                    <select
                      name="filterOptions"
                      id="filterOptions"
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="em aberto">Em Aberto</option>
                      <option value="pago">Pago</option>
                    </select>
                  </label>
                </div>

                {payments.map((payment) => {
                  if (
                    paymentFilter === 'all'
                    || paymentFilter === formatStatus(payment.status)
                  ) {
                    return (
                      <li key={payment.id}>
                        <button
                          id="client-list-btn"
                          type="button"
                          onClick={() => navigate(`/payment/${payment.id}`)}
                        >
                          {formatDate(payment.appointmentDate)}
                          {' '}
                          -
                          {' '}
                          {formatStatus(payment.status)}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsList;
