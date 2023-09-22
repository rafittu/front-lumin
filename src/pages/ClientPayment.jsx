import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ClientPayment() {
  const { paymentId } = useParams();

  const [paymentData, setPaymentData] = useState(null);
  const [updatePaymentErrors, setUpdatePaymentErrors] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [apiErrors, setApiErrors] = useState('');

  const userData = JSON.parse(localStorage.getItem('userData'));
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

    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/schedules/professional/filter/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              appointmentId: paymentData.appointmentId,
            },
          },
        );

        setAppointmentData(response.data.appointments[0]);
      } catch (error) {
        setApiErrors('falha ao buscar informações adicionais sobre o pagamento');
      }
    };

    fetchPaymentDetails();
    fetchAppointmentDetails();
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

        {apiErrors && <div className="error-message">{apiErrors}</div>}

        {updatePaymentErrors && <div className="error-message">{updatePaymentErrors}</div>}

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
                  <option value="OPEN">aberto</option>
                  <option value="PAID">pago</option>
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
                  placeholder="00.00"
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
