import axios from "axios";

const API_URL = 'http://127.0.0.1:5000/api/v1'

const handleErrors = (error) => {
    if(error.response) {
        // Request made, server code response.
        console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
        // Request made, no response received.
        console.error('API Error: No reponse received', error.request)
    } else {
        // Error making request.
        console.error('API Error:', error.message)
    }
    throw error
}

// Set Content-Type
const setHeaders = () => {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
}

// Get speakers
export const getSpeakers = async () => {
    try {
        setHeaders()
        const response = await axios.get(`${API_URL}/speakers`)
        return response.dadta
    } catch(error) {
        handleErrors(error)
    }
}

// Add speaker
export const addSpeaker = async (speaker) => {
    try {
        setHeaders()
        const response = await axios.post(`${API_URL}/speakers`, speaker)
        return response.data
    } catch(error) {
        handleErrors(error)
    }
}

// Update speaker
export const updateSpeaker = async(speakerId, updatedSpeaker) => {
    try {
        setHeaders()
        const response = await axios.get(`${API_URL}/speakers/${speakerId}`, updatedSpeaker)
        return response.data
    } catch(error) {
        handleErrors(error)
    }
}

// Delete speaker
export const deleteSpeaker = async (speakerId) => {
    const url = `/api/v1/speakers/${speakerId}`

    try {
        const speakerResponse = await axios.get(url)
        const speaker = speakerResponse.data

        if(!speaker) {
            throw new Error("Speaker not found")
        }

        const eventsResponse = await axios.get(`/api/v1/events?speakerId=${speakerId}`)
        const events = eventsResponse.data

        if (events.length > 0) {
            throw new Error("This speaker has associated events, please delete them first")
        }

        await axios.delete(url)
        return speaker
    } catch(err) {
        if(err.response) {
            const {status, data} = err.response
            throw new Error(`${status}: ${data.error}`)
        } else if(err.request) {
            throw new Error('Error: No resonse received from server')
        } else {
            throw new Error(err.message)
        }
    }

}