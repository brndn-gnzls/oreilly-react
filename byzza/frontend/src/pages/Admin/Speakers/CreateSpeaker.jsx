import React, { useState } from 'react';
import { addSpeaker } from '../../../SpeakerAPI';
import { useNavigate } from 'react-router-dom';

const CreateSpeaker = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [bio, setBio] = useState('');
    const [avatarURL, setAvatarURL] = useState(''); // Use this for avatar URL
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const speakerData = {
            name,
            email,
            company,
            position,
            bio,
            speaker_avatar: avatarURL, // Include avatar URL in the JSON payload
        };

        try {
            await addSpeaker(speakerData);
            // Reset the form fields and handle success scenario
            setName('');
            setEmail('');
            setCompany('');
            setPosition('');
            setBio('');
            setAvatarURL('');
            navigate('/admin/speakers'); // Redirect after success
        } catch (error) {
            setError(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Inputs for name, email, company, position, bio, and avatar URL */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
            <input type="text" value={avatarURL} onChange={(e) => setAvatarURL(e.target.value)} placeholder="Avatar URL" />
            <button type="submit" disabled={isLoading}>Add Speaker</button>
            {error && <div>Error: {error}</div>}
        </form>
    );
};

export default CreateSpeaker;
