import React from "react"

const WebStacks = ({ item }) => {
    let children = null

    if (item.values && item.values.length) {
        children = (
            <ul>
                {item.values.map(i => (
                    <WebStacks item={i} key={i.id} />
                ))}
            </ul>
        )
    }

    return (
        <li>
            {item.name}
            {children}
        </li>
    )
}

export default WebStacks