import React, { createContext, useState } from 'react';
import useSimulatedData from '../calculator/useSimulatedData';
import useRealData from './useRealData';

export const GroupsContext = createContext()

const GroupsProvider = ({ children, isSimulated }) => {
    const realGroups = useRealData()
    const simulatedGroups = useSimulatedData()
    const [selPath, setSelPath] = useState()
    
    let dataObj = isSimulated ? simulatedGroups : realGroups

    dataObj = {
        ...dataObj,
        selPath,
        setSelPath
    }
    return (
        <GroupsContext.Provider value={dataObj}>
            {children}
        </GroupsContext.Provider>
    )
}

export default GroupsProvider