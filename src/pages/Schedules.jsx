import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/Navbar';

import '../style/Schedules.css';

function Schedules() {
  const { userData } = useUser();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const appointments = await axios.get(
          `http://localhost:3001/schedules/professional/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log(appointments);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchAppointmentsData();
  }, []);

  return (
    <section>
      <Navbar />

      <div className="content-container">
        <h1>CONTENT</h1>
      </div>
    </section>
  );
}

export default Schedules;
