import React, { useState } from 'react'
import AcceptCalc from './AcceptCalc'
import CalcDetails from './CalcDetails/CalcDetails'

function SuggestedCalc({ value, suggestedValue, calc, payload }) {
    const [display, setDisplay] = useState(false)
    
    return (
        <div className="suggested-calc">
            <div className="suggested-calc__info">
                <div className="suggested-calc__info__label">
                    הצעה:
                </div>
                <div className="suggested-calc__info__suggested-value">
                    {suggestedValue}
                </div>
                {payload &&
                    <div 
                    onClick={() => setDisplay(true)}
                    className="suggested-calc__info__display-info">
                        פירוט
                    </div>
                }  
            </div>
            <AcceptCalc 
            calcId={calc?._id} 
            value={value} 
            suggestedValue={suggestedValue} />

            <CalcDetails
            display={display}
            setDisplay={setDisplay}
            payload={payload}
            calcName={calc?.name} />
            
        </div>
    )
}

export default SuggestedCalc
