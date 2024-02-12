import React, {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteSpeaker } from "../../../SpeakerAPI";

const DeleteSpeaker = () => {

    const {speakerId} = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        
        try {
            setIsLoading(true)
            await deleteSpeaker(speakerId)
            navigate("/admin/speakers")
        } catch(e) {
            setIsLoading(false)
            setError("[-] Failed to delete speaker.")
        }
    }
    useEffect(() => {
        return () => {
            // Clear error message on component unmount
            setError("")
        }
    }, [])

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <p>Are you sure you want to delete this speaker?</p>
            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "[!] Deleting..." : "Delete Speaker"}
            </button>
        </div>
    )
}

export default DeleteSpeaker;