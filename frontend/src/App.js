import React, { createContext, useState, useEffect } from 'react';
import UserSignUp from './componentes/UserSignUp';
import UserLogin from './componentes/UserLogin';
import Feed from './views/feed';
import Profile from './views/Profile';
import FriendProfile from './views/FriendProfile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

export const UserContext = createContext();

function App() {

  // Estado para el token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Función para manejar el seteo del token y guardarlo en localStorage
  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Estado de login basado en la existencia del token
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Efecto para actualizar el estado de login cuando cambia el token
  useEffect(() => {
    setIsLoggedIn(!!token); // Si hay un token, el usuario está logeado
  }, [token]);

  // Función para manejar el logout
  const handleLogout = () => {
    setToken(""); // Limpia el token
    localStorage.removeItem("token"); // Remuevo el token
    setIsLoggedIn(false); // booleano para gestionar el loggedin
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ token, setToken: handleSetToken }}>
        <Router>
          <Routes>
            {/* Ruta para el login */}
            <Route path="/login" element={<UserLogin onLogin={() => setIsLoggedIn(true)} />} />

            {/* Ruta de signup */}
            <Route path="/signup" element={<UserSignUp />} />

            {/* Ruta protegida para el feed */}
            <Route
              path="/feed"
              element={isLoggedIn ? <Feed onLogout={handleLogout} /> : <Navigate to="/login" />}
            />

            {/* Redirigir a login si no hay ruta */}
            <Route path="*" element={<Navigate to="/login" />} />

            <Route 
            path="/user-profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/user-profile/:friendId"
            element={isLoggedIn ? <FriendProfile /> : <Navigate to="/login" />}
          />

          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
