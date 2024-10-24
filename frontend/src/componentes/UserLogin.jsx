import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../App.js';
import '../css/UserLogin.css';

const UserLogin = ({ onLogin }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const { setToken } = useContext(UserContext);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    setSuccessMessage('');
                    setErrorMessage(data.message || 'Credenciales incorrectas');
                });
            }
            return response.json();    
        })
        .then(data => {
            if (data && data.token) {
                setErrorMessage('');
                setSuccessMessage('Inicio de sesión exitoso!');
                setToken(data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('_id', data._id);
                console.log(data);
                onLogin();
                navigate('/feed');
            }
        })
        .catch(error => {
            setErrorMessage('Error de red, por favor inténtalo de nuevo.');
            setSuccessMessage('');
        });
    };

    const handleSignUpRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
                <button type="button" onClick={handleSignUpRedirect}>Regístrate</button>
            </form>
        </div>
    );
};

export default UserLogin;
