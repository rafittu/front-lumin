import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ClientPayment() {
  const { paymentId } = useParams();

  const [apiErrors, setApiErrors] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/payment/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setPaymentData(response.data);
      } catch (error) {
        setApiErrors('falha ao buscar do pagamento');
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  return (
    <section>
      <Navbar />

      <div className="payment-container">
        <h1>Financeiro</h1>

        {console.log(paymentData)}

        {apiErrors && <div className="error-message">{apiErrors}</div>}
      </div>
    </section>
  );
}

export default ClientPayment;
