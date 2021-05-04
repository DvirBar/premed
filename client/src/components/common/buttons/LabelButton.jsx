import React from 'react'

function LabelButton({ label, icon, onClick, className }) {
    return (
        <div 
        onClick={onClick}
        className={`label-button ${className}`}>
            {icon &&
                <i className="material-icons">
                    {icon}
                </i>
            }
            <span>
                {label}
            </span>
        </div>
    )
}

export default LabelButton
