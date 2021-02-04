import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addStepSummary, editStepSummary } from '../../../../redux/actions/steps';
import FormInput from '../../../common/FormInput';

function AddStepSummary({ 
    stepId, 
    summary, 
    toggleDisplay, 
    isEdit }) {
    const [sumName, setSumName] = useState(summary?.name || '')

    const dispatch = useDispatch()

    const finishEdit = () => {
        if(sumName && sumName !== '') {
            const data = {
                name: sumName
            }

            if(isEdit) {
                dispatch(editStepSummary(stepId, summary._id, data))
            } 

            else {
                dispatch(addStepSummary(stepId, data))
            }

            toggleDisplay(false)
        }
    }
    return (
        <FormInput
        label="שם"
        type="text"
        value={sumName}
        onChange={e => setSumName(e.target.value)}
        onEnter={finishEdit} />
    )
}

export default AddStepSummary
