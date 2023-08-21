import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './pages/SignIn';

import './style/App.css';

function App() {
  return (
    <div className="backgroundImage">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
