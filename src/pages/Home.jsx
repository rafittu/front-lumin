import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

function Home() {
  const { accessToken } = useAuth();
  const { setUserData } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section>
      <Navbar />

      <div>
        <p>Content</p>
      </div>
    </section>
  );
}

export default Home;
