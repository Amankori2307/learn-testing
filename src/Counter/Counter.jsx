import React from 'react'
import { useState } from 'react';

const Counter = () => {
    const [counterValue, setCounterValue] = useState(0)
    const [inputValue, setInputValue] = useState(1)

    const onChange = (e) => {
        setInputValue(parseInt(e.target.value))
    }

    const add = () => {
        setCounterValue(counterValue +inputValue)
    }

    const sub = () => {
        setCounterValue(counterValue-inputValue)
    }
    return (
        <div>
            <h1 data-testid="header">My Counter</h1 >
            <h2 data-testid="counter" className={counterValue<=-100?"red":(counterValue>=100)?"green":""}>{counterValue}</h2>
            <div>
                <button 
                    data-testid="sub-btn"
                    onClick={sub}
                >-</button>
                <input 
                    type="number" 
                    data-testid="input" 
                    value={inputValue} 
                    onChange={onChange}
                    className="input"
                />
                <button 
                    data-testid="add-btn"
                    onClick={add}
                >+</button>
            </div>
        </div>
    );
}

export default Counter