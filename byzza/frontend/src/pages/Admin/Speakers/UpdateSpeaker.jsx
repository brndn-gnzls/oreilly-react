import React, { useState, useEffect } from 'react';
import { updateSpeaker, getSpeaker } from '../../../SpeakerAPI.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSpeaker = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const { speakerId } = useParams(); // Assuming you're using URL params to pass speakerId

    useEffect(() => {
        fetchSpeaker();
    }, [speakerId]);

    const fetchSpeaker = async () => {
        setIsLoading(true);
        try {
            const speakerData = await getSpeaker(speakerId);
            setName(speakerData.name);
            setEmail(speakerData.email);
            setCompany(speakerData.company);
            setPosition(speakerData.position);
            setBio(speakerData.bio);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await updateSpeaker(speakerId, { name, email, company, position, bio });
            setSuccessMessage('Speaker updated successfully');
            setIsLoading(false);
            navigate('/admin/speakers'); // Adjust the path as needed
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
                <button type="submit" disabled={isLoading}>Update Speaker</button>
            </form>
        </div>
    );
};

export default UpdateSpeaker;
