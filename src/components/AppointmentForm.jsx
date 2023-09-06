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
    { id: 'clientName', label: 'Nome do cliente', type: 'text' },
    { id: 'clientPhone', label: 'Telefone para contato', type: 'text' },
    { id: 'appointmentDate', label: 'Data do agendamento', type: 'date' },
    { id: 'appointmentTime', label: 'Horário do agendamento', type: 'text' },
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
      <h2>Criar Novo Compromisso</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {fields.map((field) => (
            <InputLabel htmlFor={field.id} key={field.id}>
              <input
                name={field.id}
                id={field.id}
                value={formData[field.id]}
                onChange={handleInputChange}
                type={field.type}
                placeholder={field.label}
                className="form-group"
              />
            </InputLabel>
          ))}
        </div>
        <button type="submit">Criar Compromisso</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
