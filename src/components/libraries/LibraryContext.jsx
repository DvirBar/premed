import React, { createContext } from 'react';
import useLibraries from './useLibraries';

export const LibraryContext = createContext()

const LibraryProvider = ({ children, isAdmin }) => {
    const libraries = useLibraries()
    
    return (
        <LibraryContext.Provider 
        value={libraries}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider