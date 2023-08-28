import React from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();

  return <h1>Reset password page</h1>;
}

export default ResetPassword;
