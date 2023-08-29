import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

import '../style/Home.css';

function Home() {
  const { accessToken } = useAuth();
  const { userData, setUserData } = useUser();

  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.patch(
        'http://localhost:3000/auth/account/resend-token',
        { email },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setSuccessMessage(
        `Email para confirmação de conta enviado para ${email}`,
      );
    } catch (error) {
      setErrorMessage('Erro ao enviar novo email para confirmação de conta');
      setEmail('');
    }

    setIsLoading(false);
  };

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

            <form onSubmit={handleEmailSubmit}>
              <div className="container-form">
                <label htmlFor="email">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={userData.email}
                  />
                </label>
              </div>

              {successMessage && (
              <div className="success-msg">
                <p>{successMessage}</p>
              </div>
              )}

              {errorMessage && (
              <div className="error-msg">
                <p>{errorMessage}</p>
              </div>
              )}

              <div className="inputs-buttons">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Enviando email...' : 'Enviar novo email'}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
