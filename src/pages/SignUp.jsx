import React, { useState } from 'react';

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
  });

  const handleChange = (e) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">
          Primeiro nome:
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="primeiro nome"
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUp;
