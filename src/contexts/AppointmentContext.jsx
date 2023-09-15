import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointmentData, setAppointmentData] = useState({});

  const appointmentContext = useMemo(
    () => ({
      appointmentData,
      setAppointmentData,
    }),
    [appointmentData],
  );

  return (
    <AppointmentContext.Provider value={appointmentContext}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useUser() {
  return useContext(AppointmentContext);
}

AppointmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
