import React, { useState } from 'react';
import axios from 'axios';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

      setSuccessMessage(
        'As instruções para redefinição de senha foram enviadas para o email informado!',
      );
    } catch (error) {
      setErrorMessage('Erro ao redefinir a senha.');
    }

    setEmail('');
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Recuperação de Senha</h1>

      <form onSubmit={handleEmailSubmit}>
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando email...' : 'Redefinir senha'}
        </button>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}

export default RecoverPassword;
