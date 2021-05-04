import React from 'react'

function Card({ children, type, onClick }) {
    const cardTypes = ['big', 'small']
    let usedType = type
    if(!cardTypes.includes(type)) {
        usedType = cardTypes[0]
    }

    return (
        <div 
        onClick={onClick}
        className={`card ${usedType}`} >
            {children}
        </div>
    )
}

export default Card
