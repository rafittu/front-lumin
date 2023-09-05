import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ConfirmAccountBox({ accessToken, userData, setUserData }) {
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

      setUserData((prevUserData) => ({
        ...prevUserData,
        email,
      }));

      setSuccessMessage(
        `Email para confirmação de conta enviado para ${email}`,
      );
    } catch (error) {
      setErrorMessage('Erro ao enviar novo email para confirmação de conta');

      const axiosErrorMessage = error.response.data.error.message;

      if (axiosErrorMessage === 'The new email provided is already in use') {
        setErrorMessage(`O email informado (${email}) já está em uso.`);
      }
    }

    setEmail('');
    setIsLoading(false);
  };

  return (
    <div id="confim-account-box">
      <p id="message-box">
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
  );
}

ConfirmAccountBox.propTypes = {
  accessToken: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.string,
    almaId: PropTypes.string,
    name: PropTypes.string,
    socialName: PropTypes.string,
    bornDate: PropTypes.string,
    motherName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    status: PropTypes.string,
    role: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default ConfirmAccountBox;
