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
        
        // Aquí enviamos los datos al backend
        fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
      
        })
        .catch(error => {
            console.error('Error:', error);
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
        </form>
    );
};

export default UserSignUp;
