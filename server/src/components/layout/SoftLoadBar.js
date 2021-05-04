import React from 'react'

function SoftLoadbar({ message }) {
    return (
        <div
        className="loadbar-soft">
            <p className="loader"></p>
            <span>{message}</span>
        </div>
    )
}

export default SoftLoadbar
