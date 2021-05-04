import React, { useEffect, useState } from 'react'
import CheckBox from '../../../../common/Checkbox';

function ChooseAllCalcs({ 
    chosenCalcs, 
    clearCalcs,
    chooseAllCalcs,
    calcs }) {

    const [checked, setChecked] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    
    // Set checked true if all calcs are chosen
    useEffect(() => {
        if(chosenCalcs.length === calcs.length) {
            setChecked(true)
        }

        else {
            setChecked(false)
        }
    }, [chosenCalcs])

    useEffect(() => {
        if(isChanging) {
            if(checked && chosenCalcs.length !== calcs.length) {
                chooseAllCalcs(calcs)
            }
    
            else if(!checked && chosenCalcs.length === calcs.length) {
                clearCalcs()
            }

            setIsChanging(false)
        }
    }, [isChanging])

    const selectAll = () => {
        setChecked(!checked)
        setIsChanging(true)
    }

    return (
        <CheckBox
        label="בחר/י הכל"
        onChange={selectAll}
        checked={checked} />
    )
}

export default ChooseAllCalcs
