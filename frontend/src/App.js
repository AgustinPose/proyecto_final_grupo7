import React, { useState } from 'react';
import UserSignUp from './componentes/userSignUp';
import LogIn from './componentes/logIn'; //cambiar dependiendo del nombre que le pongan
//import Feed from './componentes/feed'; //cambiar dependiendo del nombre que le pongan
//import Perfil from './componentes/perfil'; //cambiar dependiendo del nombre que le pongan
//import PerfilAmigo from './componentes/perfilAmigo'; //cambiar dependiendo del nombre que le pongan
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          
          {/* Ruta de login */}
        
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          

          {/* Ruta de signup */}
          <Route path="/signup" element={<UserSignUp />} />

          {/* Ruta privada para el feed */}
          {/*
          <Route
            path="/feed"
            element={isLoggedIn ? <Feed /> : <Navigate to="/login" />}
          />
          */}

          {/* Ruta privada para el perfil */}
          {/*
          <Route
            path="/perfil"
            element={isLoggedIn ? <Perfil onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
