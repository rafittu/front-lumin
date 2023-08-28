import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InputLabel from '../components/InputLabel';

function ResetPassword() {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState({
    password: '',
    passwordConfirmation: '',
  });

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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    console.log(token);
    console.log(newPassword);
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

      <div className="inputs-buttons">
        <button type="submit">Criar nova senha</button>
      </div>
    </form>
  );
}

export default ResetPassword;
