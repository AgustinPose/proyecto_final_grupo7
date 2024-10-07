import React, { useState } from 'react';

const UserSignUp = () => {

    // ESTADO PARA MANEJAR LOS DATOS DEL FORMULARIO
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // MANEJA LOS CAMBIOS EN EL FORMULARIO
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {  
            if (!response.ok) {
                // Manejo de errores si la respuesta no es OK
                return response.json().then(data => {
                    console.log(data.message); // Mostrar el mensaje de error
                });
            }
            return response.json();
        })
        .then(data => {
            // Solo se ejecuta si la respuesta es exitosa
            if (data) {
                console.log('Success:', data); // Mostrar el mensaje de éxito
            }
        })
        .catch(error => {
            // Este catch manejará errores de red, pero no imprimirás nada
            // Puedes omitir este bloque si no quieres manejar errores de red
        });
    };
    
    
    

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register a New User</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign Up</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>
    );
};

export default UserSignUp;
