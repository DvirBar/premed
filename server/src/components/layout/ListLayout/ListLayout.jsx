import React from 'react'

function ListLayout({ children, className }) {
    return (
        <div className={`list-layout ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default ListLayout
