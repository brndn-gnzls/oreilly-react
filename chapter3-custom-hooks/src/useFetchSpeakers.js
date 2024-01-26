import { useEffect, useState } from "react"

// Custom hook
const useFetchSpeakers = (url) => {
    const [data, setData] = useState([])

    // useEffect to async fetch data from an endpoint.
    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()

                // promise returned with json data available
                // in the setData state.
                setData(data.users)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchSpeakers();
        // Endpoint passed as an argument to the custom Hook
        // This dependency will cause the component to refresh
        // upon any change in the data.
    }, [url])

    // Hook returns the data variable state, based on 
    // API_URL: string passed as the endpoint.
    return [data]
}

export default useFetchSpeakers