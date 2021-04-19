import React from 'react'
import Modal from '../../../../../../layout/Modal'

function DisplayValidError({ 
    error, 
    title,
    display, 
    setDisplay
 }) {
    const errorMap = {
        missing: 'הנתונים הבאים חסרים על מנת לבצע את השקלול:',
        minUnits: 'למקצועות הבאים אין מספר יחידות מספיק על מנת לבצע את החישוב:'
    }

    const minUnitsText = minUnits => {
        return `מינימום ${minUnits} יחידות`
    }

    return (
        <Modal 
        display={display}
        toggleModal={setDisplay}
        title={title}>
            <p className="valid-error__error-text">
                {errorMap[error.type]}
            </p>
            <ul className="valid-error__payload-list">
                {error.payload.map(subj => 
                    <li 
                    key={subj._id}
                    className="valid-error__payload-list__subj-item">
                        <span className="valid-error__payload-list__subj-item__name">
                            {subj.name}
                        </span>
                        {error.type === 'minUnits' && 
                        subj.config &&
                            <span className="valid-error__payload-list__subj-item__min-units">
                            {minUnitsText(subj.config.minUnits || 2)}   
                            </span>                            
                        }
                    </li>
                )}
            </ul>
        </Modal>
    )
}

export default DisplayValidError
