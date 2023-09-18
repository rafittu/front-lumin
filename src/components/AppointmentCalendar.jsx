import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AppointmentCalendar({ appointments }) {
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    };

    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const groupedAppointments = {};
  appointments.forEach((appointment) => {
    const date = appointment.appointmentDate;

    if (!groupedAppointments[date]) {
      groupedAppointments[date] = [];
    }

    groupedAppointments[date].push(appointment);
  });

  return (
    <div className="appointment-calendar">
      {Object.keys(groupedAppointments).map((date) => (
        <Link
          key={date}
          to={`/daily-appointments/${date}`}
          className="calendar-date"
        >
          {formatDate(date)}
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
