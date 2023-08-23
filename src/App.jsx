import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

import './style/App.css';

function App() {
  return (
    <div className="backgroundImage">
      <AuthProvider>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
