import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUnisByCalcs } from '../../../../redux/selectors/unis';
import ChooseCalcsOption from './ChooseCalcsOption';
import { getAllStoredCalcs } from '../../../../redux/selectors/statsinputs';

function ChooseCalcs({ chosenCalcs, chooseCalc, togglePickCalcs }) {

    const calcs = useSelector(getAllStoredCalcs)

    const calcUnis = useSelector(getUnisByCalcs(calcs))

    const [error, setError] = useState('')

    const finishPickCalcs = () => {
        if(chosenCalcs.length === 0)
            setError('יש לבחור לפחות שקלול אחד')

        else
            togglePickCalcs(false)
    } 
    
    return (
        <div className="choose-calcs">
            <span className={error 
            ?   "choose-calcs-error display"
            :   "choose-calcs-error"}>
                {error}
            </span>
            <div className="choose-calcs-instructions">
                בחרו את השקלולים שברצונכם לחשב:
            </div>
            <div className="choose-calcs-list">
                {calcUnis.map(uni => 
                    <div
                    key={uni._id} 
                    className="uni-calcs-item">
                        <span className="uni-name">
                            {uni.name}
                        </span>
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
                )}
               
            </div>
            <button
            className="finish-button" 
            onClick={() => finishPickCalcs()}>
                סיום
            </button>
        </div>
    )
}

ChooseCalcs.propTypes = {
    chosenCalcs: PropTypes.array.isRequired,
    chooseCalc: PropTypes.func.isRequired,
    togglePickCalcs: PropTypes.func.isRequired,
    unis: PropTypes.array.isRequired
}

export default ChooseCalcs
