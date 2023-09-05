import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import ConfirmAccountBox from '../components/ConfirmAccountBox';

import '../style/Home.css';

function Home() {
  const navigate = useNavigate();

  const { userData, setUserData } = useUser();
  const [showConfirmAccountBox, setShowConfirmAccountBox] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);

        setShowConfirmAccountBox(response.data.status !== 'ACTIVE');
      } catch (error) {
        navigate('/signin');
      }
    };

    fetchUserData();
  }, []);

  return (
    <section>
      <Navbar />

      <div className="content-container">
        {showConfirmAccountBox && (
          <ConfirmAccountBox
            accessToken={accessToken}
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {!showConfirmAccountBox && userData.status === 'ACTIVE' && (
          <div className="quote">
            <h1>Bem Vind!</h1>
            <p>As pessoas são do tamanho dos seus sonhos (Fernando Pessoa)</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
