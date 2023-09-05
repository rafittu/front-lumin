import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ConfirmAccount() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        await axios.patch(`http://localhost:3000/auth/account/${token}`);

        setIsLoading(false);
        navigate('/home');
      } catch (error) {
        setIsLoading(false);
        navigate('/signin');
      }
    };

    fetchUserData();
  }, []);

  return <h1>{isLoading ? 'Confirmando conta...' : ''}</h1>;
}

export default ConfirmAccount;
