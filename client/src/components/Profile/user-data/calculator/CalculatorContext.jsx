import React, { createContext, useState } from 'react';

export const CalculatorContext = createContext()

const CalculatorProvider = ({ children }) => {
    const [values, setValues] = useState({})

    const setDisplay = (display, calcValue, calc) => {
        setValues({
            display,
            calc,
            calcValue
        })
    }
    const dataObj = {
        values,
        setValues,
        setDisplay
    }
    return (
        <CalculatorContext.Provider value={dataObj}>
            {children}
        </CalculatorContext.Provider>
    )
}

export default CalculatorProvider