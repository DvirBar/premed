import React from 'react'

function DeclineCalc({ accepted}) {
    return (
        <div className={`calc-button decline 
        ${accepted ? 'accepted' : ''}`}>
            <i className="material-icons">
                close
            </i>
            <span>
                דחיית שקלול
            </span>
        </div>
    )
}

export default DeclineCalc
