import React from 'react'

function CardHeader({ children, style }) {
    return (
        <div style={style} className="card-header">
            {children}
        </div>
    )
}

export default CardHeader
