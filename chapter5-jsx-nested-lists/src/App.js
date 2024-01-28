import React from "react"
import { webStacksData } from "./data/webStacksData"
import WebStacks from "./components/WebStacks/WebStacks"

const App = () => {
    return (
        <ul>
            {webStacksData.map(i => (
                <WebStacks item={i} key={i.id} />
            ))}
        </ul>
    )
}

export default App;