import React, { useState } from 'react';
import axios from 'axios';

import '../style/RecoverPassword.css';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenRequested, setTokenRequested] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post(
        'http://localhost:3000/auth/send-recover-password-email',
        { email },
      );

      setTokenRequested(true);
      setSuccessMessage(
        'As instruções para redefinir a senha foram enviadas ao email informado!',
      );
    } catch (error) {
      setErrorMessage('Erro ao redefinir a senha.');
      setEmail('');
    }

    setIsLoading(false);
  };

  return (
    <section className="recover-password-box">
      <h1>Recuperação de Senha</h1>

      <form onSubmit={handleEmailSubmit}>
        <div className="inputs-container">
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e-mail"
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

        {!tokenRequested && (
          <div className="inputs-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando email...' : 'Redefinir senha'}
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default RecoverPassword;
