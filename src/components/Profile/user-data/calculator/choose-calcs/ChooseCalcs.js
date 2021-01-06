import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUnisByCalcs } from '../../../../../redux/selectors/unis';
import { getAllStoredCalcs } from '../../../../../redux/selectors/statsinputs';
import UniCalcsItem from './UniCalcsItem';
import ChooseAllCalcs from './ChooseAllCalcs';

function ChooseCalcs({ 
    chosenCalcs, 
    chooseCalc, 
    clearCalcs,
    chooseAllCalcs,
    togglePickCalcs }) {

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

            {calcs.length > 0
            ?   <ChooseAllCalcs
                chosenCalcs={chosenCalcs}
                clearCalcs={clearCalcs}
                chooseAllCalcs={chooseAllCalcs}
                calcs={calcs} /> 
            :   <p>לא נמצאו שקלולים</p>               
            }

            <div className="choose-calcs-list">
                {calcUnis.map(uni => 
                    <UniCalcsItem
                    key={uni._id}
                    uni={uni}
                    calcs={calcs}
                    chooseCalc={chooseCalc}
                    chosenCalcs={chosenCalcs} />
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
