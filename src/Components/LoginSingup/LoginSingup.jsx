import React, { useState } from 'react';
import './LoginSingup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios'; // Asigură-te că axios este instalat

const LoginSingup = () => {
    const [action, setAction] = useState("Sing Up"); // Controlează modul (Login sau Sign Up)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // Datele formularului
    const [responseMessage, setResponseMessage] = useState(''); // Mesajul de răspuns de la API

    // Gestionează schimbările din input-uri
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Trimiterea datelor către API
    const handleSubmit = async () => {
        try {
            const endpoint = action === "Sing Up" ? '/signup' : '/login'; // Alege ruta
            const response = await axios.post(`http://localhost:5000${endpoint}`, formData); // Trimite cererea
            setResponseMessage(response.data.message); // Setează mesajul de răspuns
        } catch (error) {
            console.error('Eroare:', error);
            setResponseMessage('A apărut o eroare.');
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="User icon"/>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="Email icon"/>
                    <input
                        type="email"
                        placeholder="Email Id"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password icon"/>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {action === "Sing Up" ? null : (
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            )}
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sing Up")}>
                    Sing Up
                </div>
                <div className={action === "Sing Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
                    Log In
                </div>
            </div>
            <div className="submit-button" onClick={handleSubmit}>
                Submit
            </div>
            {responseMessage && <p>{responseMessage}</p>} {/* Afișează mesajul de răspuns */}
        </div>
    );
};

export default LoginSingup;
