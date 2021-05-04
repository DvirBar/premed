import React, { useContext } from 'react'
import { StepsContext } from '../../../StepsContext'
import DeleteContent from './DeleteContent'

function ContentItem({ stepId, sumId, groupId, content }) {
    const {
        isStepsAdmin
    } = useContext(StepsContext)
    return (
        <div className={`sum-content-item
        ${isStepsAdmin ? 'admin' : 'client'} `}>
            <span>{content.name}</span>
            <span>{content.ratio}%</span>
            {isStepsAdmin &&
                <DeleteContent
                stepId={stepId}
                sumId={sumId}
                groupId={groupId}
                contentId={content._id} />
            }
        </div>
    )
}

export default ContentItem
