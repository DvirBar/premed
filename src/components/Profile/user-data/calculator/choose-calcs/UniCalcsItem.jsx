import React from 'react'
import ChooseCalcsOption from './ChooseCalcsOption'

function UniCalcsItem({ 
    uni, 
    calcs, 
    chooseCalc, 
    chosenCalcs }) {
    return (
        <div
        key={uni._id} 
        className="uni-calcs-item">
            <p className="uni-calc-title">
                <span className="uni-name">
                    {uni.name}
                </span>
            </p>
            <div className="calcs-options-list">
                {calcs.map(calc => 
                calc.uni === uni._id &&
                    <ChooseCalcsOption 
                    key={calc._id}
                    chooseCalc={chooseCalc}
                    chosenCalcs={chosenCalcs}
                    calc={calc} />)}
            </div>
        </div>
    )
}

export default UniCalcsItem
