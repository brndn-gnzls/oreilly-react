import { useState } from 'react'

// speaker object as prop.
const SpeakerCard = speaker => {

    // speaker object contains properties.
    const { name, occupation, company, phone, email } = speaker
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => setShowDetails(!showDetails)

    return (
        // data-testid -- used to identify DOM node to test.
        // The value 'card' allows expect() to make assertions
        // about pass/fail.
        <div className='card' data-testid='card'>
            <span><h2>Name: {name}</h2></span>
            <span><h2>Occupation: {occupation}</h2></span>
            <span><h2>Company: {company}</h2></span>
            <button data-testid="toggle-test" onClick={toggleDetails}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
            {showDetails && (<div data-testid="test-details">
                <h2>Email: {email}</h2>
                <h2>Phone: {phone}</h2>
            </div>
            )}
        </div>
    )
}

export default SpeakerCard