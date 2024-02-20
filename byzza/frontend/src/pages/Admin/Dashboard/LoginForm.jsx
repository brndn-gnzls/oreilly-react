import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Corrected to call useNavigate as a function

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/v1/login', { email, password }); // Ensure correct API endpoint
            localStorage.setItem('accessToken', res.data.access_token); // Assuming your backend sends access_token
            navigate('/admin/dashboard'); // Navigate to dashboard
        } catch (err) {
            console.error("Login error:", err);
            // Optionally, handle and display error feedback
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Corrected to e.target.value
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Corrected to e.target.value
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;