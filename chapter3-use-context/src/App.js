/* -- props drilling -- */
// import React, { useState } from "react"

// function ImmediateChildComponent({ speakerName }) {
//     return (
//         <div>
//             <h2>This is an immediate Child Component</h2><hr />
//             <GrandChildComponent speakerName={speakerName} />
//         </div>
//     )
// }

// function GrandChildComponent({ speakerName }) {
//     return (
//         <div>
//             <h3>This is a Grand Child Component</h3>
//             <h4>Speakers Name: {speakerName}</h4>
//         </div>
//     )
// }

// const App = () => {

//     const [speakerName] = useState("Fred Morris")
//     return (
//         <div>
//             <h2>This is the Parent Component</h2>
//             <ImmediateChildComponent speakerName={speakerName} />
//         </div>
//     );

// }

/* -- Using useContext -- */
import React, { useState, useContext } from "react"

// Create Context<ContextType> and allows the use of context.Provider
const context = React.createContext(null);

const App = () => {
    const [speakerName] = useState("Fred Morris")

    // context.Provider wraps the child component and makes the
    // state values available.
    return (
        <context.Provider value={{ speakerName }}>
            <h1>This is the Parent Component.</h1>
            <ImmediateChildComponent />
        </context.Provider>
    )
}

function ImmediateChildComponent() {
    return (
        <div>
            <h2>This is the ImmediateChildComponent</h2><hr />
            <GrandChildComponent />
        </div>
    )
}

function GrandChildComponent() {
    // useContext to provide access to context in this component.
    const { speakerName } = useContext(context);
    return (
        <div>
            <h3>This is the GrandChildComponent</h3>
            <h4>Speakers Name: {speakerName}</h4>
        </div>
    )
}

export default App;
