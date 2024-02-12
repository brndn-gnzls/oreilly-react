import React, { useEffect, useState } from "react";
import { getSpeakers } from '../../../SpeakerAPI.jsx';

const ViewSpeakers = () => {
    const [speakers, setSpeakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSpeakers = async () => {
        setIsLoading(true);
        try {
            const data = await getSpeakers(currentPage);
            setSpeakers(data.speakers);
            setTotalPages(data.total_pages);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSpeakers();
    }, [currentPage]);

    if (isLoading) {
        return <p>Loading Speakers...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <h1>Speakers</h1>
            {speakers.length === 0 ? (
                <p>No speakers found.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Bio</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {speakers.map((speaker) => (
                                <tr key={speaker.id}>
                                    <td>{speaker.speaker_avatar}</td>
                                    <td>{speaker.name}</td>
                                    <td>{speaker.email}</td>
                                    <td>{speaker.company}</td>
                                    <td>{speaker.position}</td>
                                    <td>{speaker.bio}</td>
                                    <td>{speaker.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {currentPage > 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                        )}
                        <span> Page {currentPage} of {totalPages} </span>
                        {currentPage < totalPages && (
                            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewSpeakers;