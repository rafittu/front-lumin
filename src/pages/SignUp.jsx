import React, { useState } from 'react';
import InputLabel from '../components/InputLabel';

import '../style/SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    socialName: '',
    username: '',
    bornDate: '',
    motherName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    token: '',
  });

  const fields = [
    { id: 'firstName', label: 'Primeiro nome', type: 'text' },
    { id: 'lastName', label: 'Último nome', type: 'text' },
    { id: 'socialName', label: 'Nome social', type: 'text' },
    { id: 'username', label: 'Apelido', type: 'text' },
    { id: 'bornDate', label: 'Data de nascimento', type: 'text' },
    { id: 'motherName', label: 'Nome da mãe', type: 'text' },
    { id: 'email', label: 'Email', type: 'text' },
    { id: 'phone', label: 'Telefone', type: 'text' },
    { id: 'password', label: 'Senha', type: 'text' },
    { id: 'passwordConfirmation', label: 'Confirmação de senha', type: 'text' },
    { id: 'token', label: 'Token de acesso', type: 'text' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="signUp-section">
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          {fields.map((field) => (
            <InputLabel htmlFor={field.id} key={field.id}>
              <input
                name={field.id}
                id={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                type={field.type}
                placeholder={field.label}
              />
            </InputLabel>
          ))}
        </div>

        <div className="inputs-buttons">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
