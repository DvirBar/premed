import React, { createContext } from 'react';

export const ViewAncsContext = createContext()

const ViewAncsProvider = ({ children, isAdmin }) => {
    const value = {
        isAdmin
    }
    
    return (
        <ViewAncsContext.Provider 
        value={value}>
            {children}
        </ViewAncsContext.Provider>
    )
}

export default ViewAncsProvider