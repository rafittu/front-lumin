import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AppointmentCalendar({ appointments }) {
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="appointment-calendar">
      {appointments.map((appointment) => (
        <Link
          key={appointment.id}
          to={`/appointment/${appointment.id}`}
          className="calendar-date"
        >
          {formatDate(appointment.appointmentDate)}
        </Link>
      ))}
    </div>
  );
}

AppointmentCalendar.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      appointmentDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AppointmentCalendar;
