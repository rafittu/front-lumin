import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ClientPayment() {
  const { paymentId } = useParams();

  const [apiErrors, setApiErrors] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const formatDate = (dateString) => {
    if (dateString) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }
    return '';
  };

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
              {isEditing ? (
                <input
                  type="date"
                  value={paymentData.paymentDate || ''}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                />
              ) : (
                formatDate(paymentData.paymentDate) || 'Não especificada'
              )}
            </p>
            <p>
              Forma de Pagamento:
              {' '}
              {isEditing ? (
                <select
                  value={paymentData.paymentMethod || ''}
                  onChange={(e) => {
                    setPaymentData({ ...paymentData, paymentMethod: e.target.value });
                  }}
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="PIX">PIX</option>
                </select>
              ) : (
                paymentData.paymentMethod || 'Não especificada'
              )}
            </p>
            <p>
              Status:
              {' '}
              {isEditing ? (
                <select
                  value={paymentData.status || ''}
                  onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
                >
                  <option value="aberto">aberto</option>
                  <option value="pago">pago</option>
                </select>
              ) : (
                formatStatus(paymentData.status) || 'Não especificado'
              )}
            </p>
            <p>
              Total Pago:
              {' '}
              {isEditing ? (
                <input
                  type="text"
                  value={paymentData.totalPaid || ''}
                  placeholder="R$00,00"
                  onChange={(e) => setPaymentData({ ...paymentData, totalPaid: e.target.value })}
                />
              ) : (
                paymentData.totalPaid || 'Não especificado'
              )}
            </p>
          </div>
          )}

          <div className="edit-button">
            {isEditing ? (
              <button type="button">Salvar</button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)}>Editar</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientPayment;
