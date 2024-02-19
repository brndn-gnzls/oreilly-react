import React, { useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPasswrd] = useState('')
    const [accessToken, setAccessToken] = useState('')
    
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const res = await axios.post('/api/v1/login', {
                email, password
            })
            setAccessToken(res.data.accessToken)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            {accessToken ? (
                <Dashboard accessToken={accessToken} />
            ) : (
                <form onSubmit={handleSubmit}>
                    <button type="submit">Login</button>
                </form>
            )}
        </>
    )
}

export default LoginForm