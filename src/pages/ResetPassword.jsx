import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputLabel from '../components/InputLabel';

function ResetPassword() {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);

  const inputFields = [
    { name: 'password', label: 'Senha', type: 'password' },
    {
      name: 'passwordConfirmation',
      label: 'Confirmação de senha',
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
    if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{7,}/.test(
        newPassword.password,
      )
    ) {
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const isValidPassword = validatePassword();

    if (isValidPassword) {
      console.log(token);
      console.log(newPassword);
      console.log('chama axios');
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit}>
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
            />
          </InputLabel>
        ))}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="inputs-buttons">
        <button type="submit">Redefinir senha</button>
      </div>
    </form>
  );
}

export default ResetPassword;
