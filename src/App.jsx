import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import { UserProvider } from './contexts/UserContext';
import ConfirmAccount from './pages/ConfirmAccount';
import Schedules from './pages/Schedules';

import './style/App.css';

function App() {
  return (
    <div className="main-container">
      <UserProvider>
        <Routes>
          <Route exact path="/schedules" element={<Schedules />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/email-confirmation/:token"
            element={<ConfirmAccount />}
          />
          <Route
            exact
            path="/recover-password/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/recover-password" element={<RecoverPassword />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
