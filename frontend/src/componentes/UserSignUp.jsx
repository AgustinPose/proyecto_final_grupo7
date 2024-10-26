import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserSignUp.css';

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {  
            if (!response.ok) {
                return response.json().then(data => {
                    console.log(data.message);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log('Success:', data);
            }
        })
        .catch(error => {
            // Manejo de errores de red
        });
    };
    
    const userLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>Register a New User</h1>
                <div className="input-group">
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
                <div className="input-group">
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
                <div className="input-group">
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
                <button type="button" onClick={userLoginRedirect}>Login</button>
            </form>
        </div>
    );
};

export default UserSignUp;
