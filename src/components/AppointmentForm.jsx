import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputLabel from './InputLabel';

function AppointmentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const fields = [
    {
      id: 'clientName',
      label: 'NOME:',
      placeholder: 'Nome do cliente',
      type: 'text',
    },
    {
      id: 'clientPhone',
      label: 'TELEFONE:',
      placeholder: 'Telefone para contato',
      type: 'text',
    },
    {
      id: 'appointmentDate',
      label: 'DATA:',
      placeholder: 'Data do agendamento',
      type: 'date',
    },
    {
      id: 'appointmentTime',
      label: 'HORÁRIO:',
      placeholder: 'hh:mm',
      type: 'text',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/appointments',
        formData,
      );

      navigate(`/schedules/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="appointment-form">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {fields.map((field) => (
            <InputLabel htmlFor={field.id} key={field.id}>
              <span>{field.label}</span>

              <input
                name={field.id}
                id={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                type={field.type}
                placeholder={field.placeholder}
                className="form-group"
              />
            </InputLabel>
          ))}
        </div>

        <div className="inputs-buttons">
          <button type="submit">CRIAR AGENDAMENTO</button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
