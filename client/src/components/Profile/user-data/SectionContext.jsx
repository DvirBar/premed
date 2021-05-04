import React, { createContext } from 'react';

export const SectionContext = createContext()

const SectionProvider = ({ children, uni }) => {

    return (
        <SectionContext.Provider value={{uni}}>
            {children}
        </SectionContext.Provider>
    )
}

export default SectionProvider