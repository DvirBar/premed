import React, { createContext } from 'react';
import useLibraries from './useLibraries';

export const LibraryContext = createContext()

const LibraryProvider = ({ children, isAdmin }) => {
    return (
        <LibraryContext.Provider 
        value={isAdmin}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider