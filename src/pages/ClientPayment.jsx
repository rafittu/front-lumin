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

  const formatStatus = (status) => (status === 'OPEN' ? 'aberto' : 'pago');

  return (
    <section>
      <Navbar />

      <div id="payment-container">
        <h1>Financeiro</h1>

        {apiErrors && <div className="error-message">{apiErrors}</div>}

        <div id="payment-details">
          {paymentData && (
            <div className="payment-details">
              <p>
                Data de Pagamento:
                {' '}
                {paymentData.paymentDate || 'Não especificada'}
              </p>
              <p>
                Forma de Pagamento:
                {' '}
                {paymentData.paymentMethod || 'Não especificada'}
              </p>
              <p>
                Status:
                {' '}
                {formatStatus(paymentData.status)}
              </p>
              <p>
                Total Pago:
                {' '}
                {paymentData.totalPaid || 'Não especificado'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClientPayment;
