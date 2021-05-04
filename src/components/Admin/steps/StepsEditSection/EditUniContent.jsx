import React, { useContext } from 'react'
import UniContent from '../../../steps/step-details/UniContent'
import { StepsContext } from '../../../steps/StepsContext'

function EditUniContent({ uniContent, handleChange }) {
    const {
        pathId 
    } = useContext(StepsContext)
    console.log(uniContent);
    const onChange = data => {
        handleChange({
            name: 'uniContent',
            value: {
                ...uniContent,
                [data.name]: data.value
            }
        })
    }

    return (
        <UniContent
        content={uniContent}
        editMode={true}
        onEdit={onChange}
        pathId={pathId} />
    )
}

export default EditUniContent
