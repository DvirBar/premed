import React, { createContext, useState } from 'react';

export const LinkContext = createContext()

const LinkProvider = ({ children }) => {
    const [divWidth, setDivWidth] = useState(0)
    const [nodeX, setNodeX] = useState({})
    
    const changeNodeX = (nodeVal, stepId) => {
        setNodeX({
            ...nodeX,
            [stepId]: nodeVal
        })
    }
    
    const dataObj = {
        divWidth,
        setDivWidth,
        nodeX,
        changeNodeX
    }


    return (
        <LinkContext.Provider value={dataObj}>
            {children}
        </LinkContext.Provider>
    )
}

export default LinkProvider