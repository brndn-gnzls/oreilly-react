import React from "react";
import { useParams } from "react-router-dom";

const SpeakerDetail = () => {
    // The useParams hook will return an object that containts
    // the dynamic parameter extracted from the URL.
    const { speakerId } = useParams()

    return (
        <div className="page-wrapper">
            <h1>This is SpeakerDetail with the ID: {speakerId}</h1>
        </div>
    )
}

export default SpeakerDetail