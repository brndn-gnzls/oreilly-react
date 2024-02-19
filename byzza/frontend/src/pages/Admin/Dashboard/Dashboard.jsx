import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ accessToken }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            const accessToken = localStorage.getItem('accessToken')
            try {
                const res = await axios.get('/api/v1/dashboard', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setEmail(res.data.email);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
                <p>Welcome to the dashboard, {email}!</p>
        </div>
    );
};

export default Dashboard;