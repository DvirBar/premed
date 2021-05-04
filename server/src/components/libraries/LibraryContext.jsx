import React, { createContext } from 'react';
import { useParams } from 'react-router';

export const LibraryContext = createContext()

const LibraryProvider = ({ children, isAdmin }) => {
    const { pathId } = useParams()
    
    const value = {
        isAdmin,
        pathId
    }
    return (
        <LibraryContext.Provider 
        value={value}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider