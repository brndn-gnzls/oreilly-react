import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate
    
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const res = await axios.post('/api/v1/login', { email, password })
            localStorage.setItem('accessToken', res.data.access_token)
            navigate('/admin/dashboard')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.email)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
        </>
    )
}

export default LoginForm