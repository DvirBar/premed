import React, { createContext } from 'react';

export const ThresholdContext = createContext()

const ThresholdProvider = ({ children, calc }) => {
    const value = {
        calc
    }
    return (
        <ThresholdContext.Provider 
        value={value}>
            {children}
        </ThresholdContext.Provider>
    )
}

export default ThresholdProvider