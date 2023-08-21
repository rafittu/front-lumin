import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../style/SignIn.css';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const validateLogin = async () => {
    // axios call to validate login in back-end api
    // if axios error, return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const isValid = await validateLogin();

    setIsLoading(false);

    if (isValid) {
      navigate('/home');
    } else {
      setError(true);
    }
  };

  return (
    <div className="signIn">
      <form onSubmit={handleSubmit}>
        <div className="inputs-container">
          <label htmlFor="login">
            <input
              id="login"
              value={email}
              onChange={handleEmail}
              required
              placeholder="email"
            />
          </label>

          <label htmlFor="password">
            <input
              id="password"
              value={password}
              onChange={handlePassword}
              type="password"
              required
              placeholder="senha"
            />
          </label>

          {error && (
            <div className="error-msg">
              <p>E-mail ou senha inválido</p>
            </div>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <Link to="/signup">
        <button type="button">Cadastrar</button>
      </Link>
    </div>
  );
}

export default SignIn;
