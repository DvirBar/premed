import React from 'react'

function CardContainer({ children, className }) {
    return (
        <div className={`card-container ${className ? 'className' : ''}`}>
            {children}
        </div>
    )
}

export default CardContainer
