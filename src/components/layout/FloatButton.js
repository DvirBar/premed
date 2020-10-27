import React from 'react'

function FloatButton({ onClick, toolTip, className, children}) {
    return (
        <div 
        className={className
        ?   `float-button-wrapper ${className}`
        :   'float-button-wrapper'} 
        onClick={onClick}>
            <div className="tool-tip">
                {toolTip}
            </div>
            <div className="float-button">
                { children }
            </div>
        </div>
    )
}

export default FloatButton
