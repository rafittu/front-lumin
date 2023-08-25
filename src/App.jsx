import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';

import './style/App.css';

function App() {
  return (
    <div className="main-container">
      <AuthProvider>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/recover-password" element={<RecoverPassword />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
