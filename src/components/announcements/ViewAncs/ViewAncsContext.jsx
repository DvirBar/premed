import React, { createContext } from 'react';
import { useParams } from 'react-router';

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