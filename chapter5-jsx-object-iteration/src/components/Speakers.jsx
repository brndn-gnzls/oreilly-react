import React from "react";
import { SimpleSpeakerData } from "../data/objSpeakerData";

const Speakers = () => {

    return (
        <>
            <h1>Speakers</h1>
            <div>
                <ul>
                    {Object.keys(SimpleSpeakerData).map(key => (
                        <li key={key}>
                            {SimpleSpeakerData[key].name}
                            {SimpleSpeakerData[key].company}
                            {SimpleSpeakerData[key].street}
                            {SimpleSpeakerData[key].state}
                            {SimpleSpeakerData[key].country}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Speakers