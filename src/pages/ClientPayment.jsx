import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

import '../style/ClientPayment.css';

function ClientPayment() {
  const { paymentId } = useParams();

  const [paymentData, setPaymentData] = useState(null);
  const [updatePaymentErrors, setUpdatePaymentErrors] = useState(null);
  const [recordData, setRecordData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [apiErrors, setApiErrors] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchAppointmentDetails = async (recordId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/record/${recordId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              professionalId: userData.id,
            },
          },
        );

        setRecordData(response.data);
      } catch (error) {
        setApiErrors('falha ao buscar informações adicionais sobre o pagamento');
      }
    };

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
        fetchAppointmentDetails(response.data.appointmentId);
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

  const validatePayment = (requestBody) => {
    setUpdatePaymentErrors(null);

    if (requestBody.status === 'PAID') {
      if (!requestBody.paymentDate || !requestBody.paymentMethod || !requestBody.totalPaid) {
        setUpdatePaymentErrors('Para marcar como "pago", preencha todos os campos');
        return false;
      }
    }

    if (requestBody.totalPaid) {
      const totalPaidRegex = /^\d+\.\d{2}$/;
      if (!totalPaidRegex.test(requestBody.totalPaid)) {
        setUpdatePaymentErrors('O total pago deve ser no formato 00.00');
        return false;
      }
    }

    return true;
  };

  const handleUpdatePayment = async () => {
    const requestBody = {
      paymentDate: paymentData.paymentDate,
      paymentMethod: paymentData.paymentMethod,
      totalPaid: paymentData.totalPaid,
      status: paymentData.status,
    };

    const isPaymentValid = validatePayment(requestBody);

    if (isPaymentValid) {
      try {
        const response = await axios.patch(
          `http://localhost:3001/payment/update/${paymentId}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setPaymentData(response.data);
        setIsEditing(false);
      } catch (error) {
        setApiErrors('Falha ao atualizar o pagamento');
      }
    }
  };

  return (
    <section>
      <Navbar />

      <div id="payment-container">
        <h1>Financeiro</h1>

        {recordData && (
          <span id="payment-reference">
            <p>
              <strong>Cliente:</strong>
              {' '}
              {recordData.clientName}
            </p>
            <p>
              <strong>Data referência:</strong>
              {' '}
              {formatDate(recordData.scheduledDate)}
            </p>
          </span>
        )}
        {apiErrors && <div className="error-message">{apiErrors}</div>}

        <div id="payment-details">
          {paymentData && (
          <div className="payment-details">
            <p>
              <strong>Data de Pagamento:</strong>
              {' '}
              {isEditing ? (
                <input
                  type="date"
                  value={paymentData.paymentDate || ''}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                  className="edit-payment"
                />
              ) : (
                formatDate(paymentData.paymentDate) || 'Não especificada'
              )}
            </p>

            <p>
              <strong>Forma de Pagamento:</strong>
              {' '}
              {isEditing ? (
                <select
                  value={paymentData.paymentMethod || ''}
                  onChange={(e) => {
                    setPaymentData({ ...paymentData, paymentMethod: e.target.value });
                  }}
                  className="edit-payment"
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="PIX">PIX</option>
                </select>
              ) : (
                paymentData.paymentMethod || 'Não especificada'
              )}
            </p>

            <p>
              <strong>Status:</strong>
              {' '}
              {isEditing ? (
                <select
                  value={paymentData.status || ''}
                  onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
                  className="edit-payment"
                >
                  <option value="OPEN">aberto</option>
                  <option value="PAID">pago</option>
                </select>
              ) : (
                formatStatus(paymentData.status) || 'Não especificado'
              )}
            </p>

            <p>
              <strong>Total Pago:</strong>
              {' '}
              {isEditing ? (
                <input
                  type="text"
                  value={paymentData.totalPaid || ''}
                  placeholder="00.00"
                  onChange={(e) => setPaymentData({ ...paymentData, totalPaid: e.target.value })}
                  className="edit-payment"
                />
              ) : (
                paymentData.totalPaid || 'Não especificado'
              )}
            </p>
          </div>
          )}

          {updatePaymentErrors && <div className="error-message">{updatePaymentErrors}</div>}

          <div className="inputs-buttons">
            {isEditing ? (
              <button type="button" onClick={handleUpdatePayment}>Salvar</button>
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
