import { useQuery } from 'react-query'
import axios from 'axios'

function App() {
    /*
        -- useQuery() takes two arguments:
        query key: speakers.
        callback: uses axios to fetch data from endpoint.

        useQuery is destructured with variables -- {data, isLoading, error}
    */
    const { data, isLoading, error } = useQuery("speakers", () => (axios("https://jsonplaceholder.typicode.com/users")))

    // Check to see whether there is an erorr message coming
    // from the error object.
    if (error) return <h4>Error: {error.message}, retry again</h4>
    if (isLoading) return <h4>...Loading data</h4>
    console.log(data)

    return (
        <>
            <h1>Displaying Speakers Information</h1>
            <ul>
                {data.data.map(speaker => (
                    <li key={speaker.id}>
                        {speaker.name}, <em>{speaker.email}</em>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App;