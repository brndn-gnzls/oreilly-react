import React, { useRef } from "react"

const App = () => {
    const inputRef = useRef(null)

    const clickButton = () => {
        inputRef.current.focus()
    }

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={clickButton}>Click to Focus on Input</button>
        </>
    )

}

export default App