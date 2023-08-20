import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';

import './style/App.css';

function App() {
  return (
    <div className="backgroundImage">
      <Routes>
        <Route exact path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
