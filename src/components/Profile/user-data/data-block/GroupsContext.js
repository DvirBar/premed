import React, { createContext } from 'react';
import useSimulatedData from '../calculator/useSimulatedData';
import useRealData from './useRealData';

export const GroupsContext = createContext()

const GroupsProvider = ({ children, isSimulated }) => {
    const realGroups = useRealData()
    const simulatedGroups = useSimulatedData()
    return (
        <GroupsContext.Provider value={isSimulated ? simulatedGroups : realGroups}>
            {children}
        </GroupsContext.Provider>
    )
}

export default GroupsProvider