import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://127.0.0.1:5000/api/v1/login', { email, password }, { withCredentials: true });
            navigate('/admin/dashboard'); // Navigate to dashboard on successful login
        } catch (err) {
            console.error("Login error:", err);
            alert('Login failed. Please check your credentials and try again.'); // Simplified error handling
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
    );
};

export default LoginForm;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loginError, setLoginError] = useState(''); // State to store login error messages
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoginError(''); // Reset login error message

//         try {
//             // Ensure correct API endpoint and withCredentials for session cookie handling
//             await axios.post('http://127.0.0.1:5000/api/v1/login', { email, password }, { withCredentials: true });
//             navigate('/admin/dashboard'); // Navigate to dashboard on successful login
//         } catch (err) {
//             // Handle login error
//             console.error("Login error:", err);
//             // Set a user-friendly error message. Adjust based on your error handling strategy.
//             setLoginError('Login failed. Please check your credentials and try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 required
//             />
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 required
//             />
//             <button type="submit">Login</button>
//             {loginError && <p style={{ color: 'red' }}>{loginError}</p>} {/* Display login error message */}
//         </form>
//     );
// };

// export default LoginForm;