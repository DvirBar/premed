import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getTableYear } from '../../../../../redux/selectors/userdata'

function ChooseCalcsOption({ chooseCalc, chosenCalcs, calc }) {
    const tableYear = useSelector(getTableYear)
    const calcYear = tableYear + calc.versions?.calcGap

    return (
        <div
        onClick={() => chooseCalc(calc)} 
        className={chosenCalcs?.find(thisCalc =>
            thisCalc._id === calc._id)
        ?   "choose-calc-option chosen"
        :   "choose-calc-option"}>
            {calc.name} {calc.versions && calcYear}
        </div>
    )
}

ChooseCalcsOption.propTypes = {
    chooseCalc: PropTypes.func.isRequired,
    chosenCalcs: PropTypes.array.isRequired,
    calcField: PropTypes.object.isRequired
}

export default ChooseCalcsOption
