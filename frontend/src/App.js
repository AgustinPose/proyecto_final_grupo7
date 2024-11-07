import React, { createContext, useState, useEffect } from "react";
import UserSignUp from "./componentes/UserSignUp";
import UserLogin from "./componentes/UserLogin";
import Feed from "./views/feed";
import Profile from "./views/Profile";
import FriendProfile from "./views/FriendProfile";
import RedirectIfAuth from "./componentes/RedirectIfAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ token, setToken: handleSetToken }}>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/feed" />
                ) : (
                  <UserLogin onLogin={() => setIsLoggedIn(true)} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/feed" />
                ) : (
                  <UserSignUp />
                )
              }
            />
            <Route
              path="/feed"
              element={
                isLoggedIn ? (
                  <Feed onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Redirigir a login si no hay ruta */}
            <Route path="*" element={<Navigate to="/login" />} />

            <Route
              path="/user-profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />

            <Route
              path="/user-profile/:friendId"
              element={
                isLoggedIn ? <FriendProfile /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
