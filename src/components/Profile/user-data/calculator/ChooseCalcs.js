import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUnisFields } from '../../../../redux/selectors/unis';
import { getCalcFields } from '../../../../redux/selectors/datafields';
import ChooseCalcsOption from './ChooseCalcsOption';

function ChooseCalcs({ chosenCalcs, chooseCalc, togglePickCalcs }) {

    const calcFields = useSelector(state => 
        getCalcFields(state.datafields.fields))

    const calcUnis = useSelector(state => 
        getUnisFields(state.unis.unis, calcFields))

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
                            {calcFields.map(calc => 
                            calc.university === uni._id &&
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
