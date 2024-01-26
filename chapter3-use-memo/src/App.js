import React, { useState, useMemo, useRef } from "react"

// Hypothetical data source.
const speakers = [
    {
        id: 10,
        name: "John Lewis"
    },
    {
        id: 11,
        name: "Marble Newton"
    }
]

const App = () => {
    // Variables to state.
    // text and searchTerm are decalred with their setter methods
    // as variables.
    // const [text, setText] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const inputRef = useRef()

    // const onChangeText = (e) => {
    //     setText(e.target.value)
    // }

    // console.log("Text", text)

    // Event handler to update the initial state to the current state.
    const handleClick = () => {
        setSearchTerm(inputRef.current.value)
    }

    // console.log("Search Term", text)

    /*
        Used to filter an array of speakers based on the searchTerm using
       case insensitive search.
    */
    // const filteredSpeakers = speakers.filter((speaker) => {
    //     console.log("Filtering speakers...")
    //     return speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
    // })
    const filteredSpeakers = useMemo(() => speakers.filter((speaker) => {
        console.log("Filtering speakers...");
        return speaker.name.toLowerCase()
            .includes(searchTerm.toLowerCase());
    }), [searchTerm]);


    return (
        <div>
            <div>
                <input ref={inputRef} type="text" />
                <button onClick={handleClick}>Search</button>
            </div>
            {filteredSpeakers.map((filteredSpeaker) => (
                <li key={filteredSpeaker.id}>{filteredSpeaker.name}</li>
            ))}
        </div>
    )
}

export default App;
