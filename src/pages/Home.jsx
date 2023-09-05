import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

import '../style/Home.css';
import ConfirmAccountBox from '../components/ConfirmAccountBox';

function Home() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
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
        {userData.status !== 'ACTIVE' && (
        <ConfirmAccountBox
          accessToken={accessToken}
          userData={userData}
          setUserData={setUserData}
        />
        )}
      </div>
    </section>
  );
}

export default Home;
