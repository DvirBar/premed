import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function ChooseCalcsOption({ chooseCalc, chosenCalcs, calc }) {
    return (
        <div
        onClick={() => chooseCalc(calc)} 
        className={chosenCalcs?.find(thisCalc =>
            thisCalc._id === calc._id)
        ?   "choose-calc-option chosen"
        :   "choose-calc-option"}>
            {calc.name}
        </div>
    )
}

ChooseCalcsOption.propTypes = {
    chooseCalc: PropTypes.func.isRequired,
    chosenCalcs: PropTypes.array.isRequired,
    calcField: PropTypes.object.isRequired
}

export default ChooseCalcsOption
