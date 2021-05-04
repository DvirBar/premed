import React, { useState } from 'react'
import FormInput from '../../../../common/FormInput'
import { addStepSummaryGroup, addStepSummaryGroupContent } from '../../../../../redux/actions/steps'
import { useDispatch } from 'react-redux'

function AddContent({ stepId, sumId, groupId, isNewGroup, toggleDisplay }) {

    const [groupName, setGroupName] = useState('')
    const [name, setName] = useState('')
    const [ratio, setRatio] = useState('')

    const handleRatioChange = value => {
        if(!isNaN(value)) {
            setRatio(value)
        }
    }

    const dispatch = useDispatch()

    const commitSubmit = () => {
        const data = {
            name,
            ratio,
            groupName
        }

        toggleDisplay(false)

        if(isNewGroup) {
            dispatch(addStepSummaryGroup(
                stepId,
                sumId,
                data
            ))
        }

        else {
            dispatch(addStepSummaryGroupContent(
                stepId,
                sumId,
                groupId,
                data
            ))
        }
        
    }

    return (
        <div className="add-sum-group">
            {isNewGroup &&
                <FormInput
                label="שם קבוצה"
                type="text"
                width="15rem"
                value={groupName}
                onChange={e => setGroupName(e.target.value)} />                
            }
                        
            <div 
            className="add-group-content">
                <FormInput
                label="שם"
                type="text"
                width="7rem"
                value={name}
                onChange={e => setName(e.target.value)} />

                %<FormInput
                label="יחס"
                type="text"
                name="ratio"
                width="3rem"
                value={ratio}
                onChange={e => handleRatioChange(e.target.value)} />
                
                <button 
                onClick={() => commitSubmit()}
                className="btn-small">
                    יצירה
                </button>
                <button 
                onClick={() => toggleDisplay(false)}
                className="btn-small">
                    ביטול
                </button>
            </div>
        </div>
    )
}

export default AddContent
