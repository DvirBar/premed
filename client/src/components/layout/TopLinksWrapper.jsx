import React from 'react'

function TopLinksWrapper({ children }) {
    return (
        <div className="top-links-wrapper">
            <div className="top-links-wrapper__container">
                {children}
            </div>
        </div>
    )
}

export default TopLinksWrapper
