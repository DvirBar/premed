import React from 'react'
import ToolTip from './ToolTip'

function FloatButton({ onClick, toolTip, className, children}) {
    return (
        <div 
        className={className
        ?   `float-button-wrapper ${className}`
        :   'float-button-wrapper'} 
        onClick={onClick}>
            {toolTip &&
                <ToolTip text={toolTip} />
            }
            <div className="float-button">
                { children }
            </div>
        </div>
    )
}

export default FloatButton
