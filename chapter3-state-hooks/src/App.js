import React, {useState} from 'react';

const App = () => {
    const [count, setCount] = useState(0);

    const handleIncrementByTen = () => {
        setCount(count + 10);
    };

    const handleDecrementByTen = () => {
        setCount(count - 10);
    };

    const resetHandler = () => {
        setCount(0);
    };

    return (
        <div>
            Initial Count: {count}
            <hr />
            <div>
                <button type="button" onClick={handleIncrementByTen}>
                    Increment by 10
                </button>
                <button type="button" onClick={handleDecrementByTen}>
                    Decrement by 10
                </button>
                <button type="button" onClick={resetHandler}>
                    Reset to initial state
                </button>
            </div>
        </div>
    );
};

export default App;