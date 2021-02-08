import React, { useContext } from 'react'
import { StepsContext } from '../../../StepsContext'
import AddSummaryGroup from './AddSummaryGroup'
import SummaryGroupsList from './SummaryGroupsList'

function SummaryGroupContent({
    stepId, 
    sumId, 
    groups, 
    display,
    toggleGroups
}) {

    const {
        isStepsAdmin
    } = useContext(StepsContext)
    
    return (
        <div>
            <SummaryGroupsList 
            display={display} 
            toggleGroups={toggleGroups}
            stepId={stepId}
            sumId={sumId}
            groups={groups}/>

            {isStepsAdmin &&
                <AddSummaryGroup
                stepId={stepId}
                sumId={sumId} />                
            }
        </div>
    )
}

export default SummaryGroupContent
