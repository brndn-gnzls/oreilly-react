import { useReducer, useEffect } from "react"
import axios from "axios"

// Initial state properties of the component are first specifed.
const initialState = {
    isLoading: false,
    error: null,
    data: null
}

/* -- reducer function -- */

const reducer = (state, action) => {
    // The action through the type property defines the logic of the state.
    switch (action.type) {
        case "getEventSchedule":
            return {
                ...state,
                isLoading: true,        // fetching state data.
            };
        case "getEventScheduleSuccess":
            return {
                ...state,
                isLoading: false,       // data is fetched.
                data: action.payload,   // we have useful returned data in this state.
            };
        case "getEventScheduleFailure":
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

// Handles the view portion of the component state where useReducer
// is defined and executed.
const App = () => {
    // Accepts two arguments: reducer and initialState.
    // Returns two array vars: state and dispatch.
    const [state, dispatch] = useReducer(reducer, initialState); // useReducer defined and executed.
    console.log("render", state)

    // useEffect used for side effects, fetches the schedule data
    // from the specified endpoint.
    useEffect(() => {
        // dispatch is triggered based on the type of action, getEventSchedule
        dispatch({ type: "getEventSchedule" });
        axios.get("http://localhost:8000/schedules")
            .then((response) => {
                console.log("response", response)
                // When the type of action is getEventScheduleSuccess, we expect
                // returned data - thus the payload property.
                dispatch({ type: "getEventScheduleSuccess", payload: response.data })
            })
            .catch(() => {
                dispatch({ type: "getEventScheduleFailure" })
            })
    }, [])

    // Render schedules to the screen.
    return (
        <div>
            <h2>Event Schedules</h2>
            {state.isLoading && <div>Loading...</div>}
            <ul>
                {state.data && state.data.map((schedule) => (
                    <li key={schedule.id}>
                        Time: {schedule.id} <br />
                        Speaker: {schedule.speaker} <br />
                        Subject: {schedule.subjectTitle} <br />
                        Venue: {schedule.venue}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default App;
