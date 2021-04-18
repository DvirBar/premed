import React from 'react'

function DisplayValidError({ error }) {
    const errorMap = {
        missing: 'המקצועות הבאים חסרים על מנת לבצע את השקלול:',
        minUnits: 'למקצועות הבאים אין מספר יחידות מספיק על מנת לבצע את החישוב:'
    }

    const minUnitsText = minUnits => {
        return ` (מינימום ${minUnits} יחידות)`
    }

    return (
        <div className="valid-error">
            <p className="error-text">
                {errorMap[error.type]}
            </p>
            <ul className="payload-list">
                {error.payload.map(subj => 
                    <li 
                    key={subj._id}
                    className="subj-item">
                        <span>
                            {subj.name}
                        </span>
                        {error.type === 'minUnits' && 
                        subj.config?.minUnits &&
                            <span>
                                {minUnitsText(subj.config.minUnits)}
                            </span>                            
                        }
                    </li>
                )}
            </ul>
        </div>
    )
}

export default DisplayValidError
