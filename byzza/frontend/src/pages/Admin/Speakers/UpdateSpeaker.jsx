import React, { useState, useEffect } from 'react';
import { updateSpeaker } from '../../../SpeakerAPI.jsx';
import { useNavigate } from 'react-router-dom';

const UpdateSpeaker = ({ speakerId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate=useNavigate();
    useEffect(() => {
        // Fetch the speaker data based on speakerId
        fetchSpeaker();
    }, [speakerId]);

    const fetchSpeaker = async () => {
        try {
            // Fetch the speaker data from the backend based on speakerId
            const speakerData = await getSpeaker(speakerId);
            setName(speakerData.name);
            setEmail(speakerData.email);
            setCompany(speakerData.company);
            setPosition(speakerData.position);
            setBio(speakerData.bio);
        } catch (error) {
            setError(error.message);
        }
    }
};