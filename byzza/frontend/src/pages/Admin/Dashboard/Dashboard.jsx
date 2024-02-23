import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('https://127.0.0.1:5000/api/v1/dashboard', { withCredentials: true })
            .then(response => setEmail(response.data.email))
            .catch(error => console.log(error));
    }, []);

    return <div>Welcome to the dashboard, {email || "Guest"}!</div>;
};

export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//     const [email, setEmail] = useState('');

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 // Since you're using sessions, remove the Authorization header.
//                 // Ensure withCredentials is true to include session cookies with the request.
//                 const res = await axios.get('http://127.0.0.1:5000/api/v1/dashboard', { withCredentials: true });
//                 setEmail(res.data.email);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     return (
//         <div>
//             <p>Welcome to the dashboard, {email}!</p>
//         </div>
//     );
// };

// export default Dashboard;