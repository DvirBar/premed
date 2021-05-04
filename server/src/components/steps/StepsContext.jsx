import React, { createContext } from 'react';
import useStepsAdmin from '../admin/steps/useStepsAdmin';
import useStepsClient from './hooks/useStepsClient';

export const StepsContext = createContext()

const StepsProvider = ({ children, isAdmin }) => {
    const stepsAdmin = useStepsAdmin()
    const stepsClient = useStepsClient()
    
    return (
        <StepsContext.Provider 
        value={isAdmin ? stepsAdmin : stepsClient}>
            {children}
        </StepsContext.Provider>
    )
}

export default StepsProvider