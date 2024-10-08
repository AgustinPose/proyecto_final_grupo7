import React, { useState, useEffect } from 'react';
import UserSignUp from './componentes/userSignUp';
import UserLogin from './componentes/UserLogin'; // Cambia según el nombre de tu archivo
import Feed from './views/feed'; // Cambia según el nombre de tu archivo
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

function App() {

  // Inicializa el estado de login verificando el localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // Si existe en localStorage, lo usamos
  });

  // Función que se ejecuta cuando el usuario inicia sesión
  const handleLogin = () => {
    setIsLoggedIn(true); // Actualiza el estado
    localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en localStorage
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de localStorage
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Ruta para el login */}
          <Route path="/login" element={<UserLogin onLogin={handleLogin} />} />

          {/* Ruta para el signup */}
          <Route path="/signup" element={<UserSignUp />} />

          {/* Ruta protegida para el feed */}
          <Route
            path="/feed"
            element={isLoggedIn ? <Feed onLogout={handleLogout} /> : <Navigate to="/login" />}
          />

          {/* Redirigir a login si no hay ruta */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
