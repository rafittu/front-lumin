import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAppointment } from '../contexts/AppointmentContext';

import '../style/AppointmentDetails.css';

function AppointmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const appointmentId = id;
  const { setAppointmentData } = useAppointment();

  const [appointment, setAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({});

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
        setAppointmentData(response.data.appointments[0]);
        setEditedAppointment({ ...response.data.appointments[0] });
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const redirect = () => {
    navigate(`/daily-appointments/${appointment.appointmentDate}`);
  };

  const handleEdit = async () => {
    const updatedFields = {
      appointmentDate: editedAppointment.appointmentDate,
      appointmentTime: editedAppointment.appointmentTime,
      clientPhone: editedAppointment.clientPhone,
    };

    try {
      await axios.patch(
        `http://localhost:3001/schedules/update/${appointment.id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            professionalId: userData.id,
          },
        },
      );

      setAppointment({ ...editedAppointment });

      setIsEditing(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/schedules/delete/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      redirect();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <section>
      <Navbar />

      <div id="schedule-container">
        <h1>Detalhes do agendamento</h1>
        <div id="appointment-details">
          {appointment ? (
            <>
              <p className="detail-label">
                Cliente:
                <span className="detail-value">{appointment.clientName}</span>
              </p>
              <p className="detail-label">
                Data:
                {isEditing ? (
                  <input
                    type="date"
                    value={editedAppointment.appointmentDate}
                    onChange={(e) => setEditedAppointment({
                      ...editedAppointment,
                      appointmentDate: e.target.value,
                    })}
                    className="edit-appointment"
                  />
                ) : (
                  <span className="detail-value">
                    {formatDate(appointment.appointmentDate)}
                  </span>
                )}
              </p>
              <p className="detail-label">
                Hora:
                {isEditing ? (
                  <input
                    type="text"
                    value={editedAppointment.appointmentTime}
                    placeholder="hh:mm"
                    onChange={(e) => setEditedAppointment({
                      ...editedAppointment,
                      appointmentTime: e.target.value,
                    })}
                    className="edit-appointment"
                  />
                ) : (
                  <span className="detail-value">
                    {appointment.appointmentTime}
                  </span>
                )}
              </p>
              <p className="detail-label">
                Telefone:
                {isEditing ? (
                  <input
                    type="text"
                    value={editedAppointment.clientPhone}
                    onChange={(e) => setEditedAppointment({
                      ...editedAppointment,
                      clientPhone: e.target.value,
                    })}
                    className="edit-appointment"
                  />
                ) : (
                  <span className="detail-value">
                    {appointment.clientPhone}
                  </span>
                )}
              </p>
            </>
          ) : (
            <div>Carregando detalhes do compromisso...</div>
          )}

          <div className="inputs-buttons">
            {isEditing ? (
              <button type="button" onClick={handleEdit}>
                Salvar
              </button>
            ) : (
              <button type="button" onClick={toggleEdit}>
                Editar
              </button>
            )}

            <button type="button" onClick={handleDelete}>
              Excluir
            </button>
          </div>
        </div>

        <div className="inputs-buttons">
          <button type="button" onClick={redirect}>
            Voltar
          </button>

          <Link to={`/record/${id}`}>
            <button type="button">Iniciar atendimento</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AppointmentDetails;
