import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLinkLabel } from '../../../../redux/actions/steps'

function AddLinkLabel({ step }) {
    const [label, setLabel] = useState(step.linkLabel)
    
    const dispatch = useDispatch()

    const addLabel = () => {
        if(label && label !== step.linkLabel) {
            const data = {
                labelName: label
            }
    
            dispatch(addLinkLabel(step._id, data))
        }  
    }

    return (
        <input
        type="text"
        value={label}
        onChange={e => setLabel(e.target.value)}
        onBlur={() => addLabel()}
        className="add-link-label" />
    )
}

export default AddLinkLabel
