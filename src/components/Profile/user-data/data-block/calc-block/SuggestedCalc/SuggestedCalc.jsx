import React from 'react'
import AcceptCalc from './AcceptCalc'

function SuggestedCalc({ value, suggestedAccepted, calc }) {
    return (
        <div className="suggested-calc">
            <div className="suggested-calc__info">
                <div className="suggested-calc__info__label">
                    הצעה:
                </div>
                <div className="suggested-calc__info__suggested-value">
                    {value}
                </div>
                <div className="suggested-calc__info__display-info">
                    פירוט
                </div>
            </div>
            <AcceptCalc 
            calcId={calc?._id} 
            value={value} 
            accepted={suggestedAccepted} />
        </div>
    )
}

export default SuggestedCalc
