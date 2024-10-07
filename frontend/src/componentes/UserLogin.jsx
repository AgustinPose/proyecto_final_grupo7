import React, { useState } from 'react';

const UserLogin = () => {
    // Estado para manejar los datos del formulario de login
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Estado para manejar mensajes de error o éxito
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
                console.log('Success:', data); // Replazar esto con la Redireccion que utilizaremos
            }
        })
        .catch(error => {
            // Maneja los errores de red
            setErrorMessage('Error de red, por favor inténtalo de nuevo.');
            setSuccessMessage('');
        });
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
        </form>
    );
};

export default UserLogin;
