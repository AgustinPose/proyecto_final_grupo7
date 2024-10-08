import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const UserLogin = ({ onLogin }) => {
    // Estado para manejar los datos del formulario de login
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Estado para manejar mensajes de error o éxito
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Maneja los cambios en el formulario
    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es ok (401 o algun otro)
                return response.json().then(data => {
                    setSuccessMessage(''); // Limpiamos el mensaje de exito
                    setErrorMessage(data.message || 'Credenciales incorrectas');
                });
            }
            return response.json();
        })
        .then(data => {
            // Si la respuesta es exitosa
            if (data) {
                setErrorMessage(''); // Limpiamos mensaje de error
                setSuccessMessage('Inicio de sesión exitoso!');
                onLogin();
                navigate('/feed'); // Redirigimos al feed
            }
        })
        .catch(error => {
            // Maneja los errores de red
            setErrorMessage('Error de red, por favor inténtalo de nuevo.');
            setSuccessMessage('');
        });
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirige a la página de registro
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            
            <div>
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
            <div>
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
            <br />
            <button type="button" onClick={handleSignUpRedirect}>Regístrate</button>
        </form>
    );
};

export default UserLogin;
