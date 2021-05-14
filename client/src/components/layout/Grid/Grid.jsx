import React from 'react'

function Grid({ children, className}) {
    
    return (
        <div 
        className={`grid ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default Grid
