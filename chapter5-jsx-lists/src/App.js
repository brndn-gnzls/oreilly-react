import React from 'react'

export default function App() {
    const speakerName = 'John Holt'

    return (
        <div className='App'>
            <h1>React Conference 2024</h1>
            <h2>{speakerName}</h2>
            <h2>{5 + 5}</h2>
        </div>
    )
}