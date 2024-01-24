import React, {useState} from 'react';

// const App = () => {
//     // Initialize state.
//     const [count, setCount] = useState(0);  // initial state of 0, returns count and setCount.

//     const handleIncrementByTen = () => {
//         setCount(count + 10);
//     };

//     const handleDecrementByTen = () => {
//         setCount(count - 10);
//     };

//     const resetHandler = () => {
//         setCount(0);
//     };

//     return (
//         <div>
//             Initial Count: {count}
//             <hr />
//             <div>
//                 <button type="button" onClick={handleIncrementByTen}>
//                     Increment by 10
//                 </button>
//                 <button type="button" onClick={handleDecrementByTen}>
//                     Decrement by 10
//                 </button>
//                 <button type="button" onClick={resetHandler}>
//                     Reset to initial state
//                 </button>
//             </div>
//         </div>
//     );
// };


/* -- Passing State As Props -- */
// const ParentComponent = () => {
//     const [count, setCount] = useState(0);

//     const handleIncrementByTen = () => {
//         setCount(count + 10)
//     }

//     return (
//         <div>
//             <p>Parent Count: {count}</p>
//             <ChildComponent count={count} />
//             <button onClick={handleIncrementByTen}>Increment</button>
//         </div>
//     );
// };

// const ChildComponent = ({count}) => {
//     return <p>Child Count: {count}</p>
// }

// const App = () => {
//     return (
//         <>
//             <ParentComponent />
//         </>
//     )
// }


/* -- Conditional State -- */
const Dashboard = () => {
    // isLoggedIn managed using the useState Hook.
    // This variable tracks if the user is currently logged in or not.
    const [isLoggedIn, setIsLoggedIn] = useState(false);    // initial value of isLoggedIn == false

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    // Braces are used to wrap conditionals.
    return (
        <div>
            {isLoggedIn ? (<button onClick={handleLogout}>Logout</button>) :
                          (<button onClick={handleLogin}>Login</button>)}
            {isLoggedIn && <p>Hey friend, welcome!</p>}
            {!isLoggedIn && <p>Please log in to continue.</p>}
        </div>
    )
}

const App = () => {
    return (
        <>
            <Dashboard />
        </>
    )
}

export default App;