import React from 'react'
import { useDispatch } from 'react-redux'
import { removeStepSummaryGroupContent } from '../../../../../redux/actions/steps'

function DeleteContent({ stepId, sumId, groupId, contentId }) {
    const dispatch = useDispatch()

    const commitDelete = () => {
        dispatch(removeStepSummaryGroupContent(
            stepId,
            sumId,
            groupId,
            contentId
        ))
    }

    return (
        <i 
        onClick={() => commitDelete()}
        className="material-icons delete-content">
            close
        </i>
    )
}

export default DeleteContent
