import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '../components/InputLabel';

import '../style/ResetPassword.css';

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputFields = [
    { name: 'password', label: 'Nova senha', type: 'password' },
    {
      name: 'passwordConfirmation',
      label: 'Confirmação da senha',
      type: 'password',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{7,}/;

    if (!passwordRegex.test(newPassword.password)) {
      setErrorMessage(
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um caractere especial',
      );
      return false;
    }

    if (newPassword.password !== newPassword.passwordConfirmation) {
      setErrorMessage('As senhas não coincidem');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const resetPassword = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/auth/reset-password/${token}`,
        newPassword,
      );

      return true;
    } catch (error) {
      setErrorMessage('Token inválido ou expirado.');
      return false;
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = validatePassword();

    if (isValidPassword) {
      setIsLoading(true);

      const isPasswordReset = await resetPassword();

      if (isPasswordReset) {
        navigate('/signin');
      }
    }

    setIsLoading(false);
  };

  return (
    <section className="reset-password-box">
      <form onSubmit={handlePasswordSubmit}>
        <div className="password-format-indicators">
          <span
            className={/[A-Z]/.test(newPassword.password) ? 'valid' : 'invalid'}
          >
            A
          </span>
          <span
            className={/[a-z]/.test(newPassword.password) ? 'valid' : 'invalid'}
          >
            a
          </span>
          <span
            className={/[0-9]/.test(newPassword.password) ? 'valid' : 'invalid'}
          >
            0-9
          </span>
          <span
            className={/\W/.test(newPassword.password) ? 'valid' : 'invalid'}
          >
            @
          </span>
        </div>

        <div className="inputs-container">
          {inputFields.map((field) => (
            <InputLabel htmlFor={field.name} key={field.name}>
              <input
                name={field.name}
                id={field.name}
                value={newPassword[field.name]}
                onChange={handleInputChange}
                type={field.type}
                placeholder={field.label}
                className={errorMessage ? 'error' : ''}
              />
            </InputLabel>
          ))}
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="inputs-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Redefinir Senha'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ResetPassword;
