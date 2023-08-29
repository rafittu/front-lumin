import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

import '../style/Home.css';

function Home() {
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
        console.log(userData);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section>
      <Navbar />

      <div className="content-container">
        {userData.status !== 'ACTIVE' && (
          <div id="confim-account-box">
            <p>
              Sua conta ainda não foi confirmada. Enviamos um email para
              {' '}
              <strong>{userData.email}</strong>
              , basta clicar no link de
              confirmação para obter acesso total na plataforma!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
