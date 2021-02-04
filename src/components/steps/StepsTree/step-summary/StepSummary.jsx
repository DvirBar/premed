import React, { Fragment, useContext, useState } from 'react'
import LabelButton from '../../../common/buttons/LabelButton'
import { StepsContext } from '../../StepsContext'
import StagingSum from './StagingSum'
import StepSummariesList from './StepSummariesList'

function StepSummary({ stepId, summaries }) {
    const [displayStaging, setDisplayStaging] = useState(false)
    
    const toggleStaging = toggle => {
        if(isStepsAdmin) {
            setDisplayStaging(toggle)            
        }
    }

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    return (
        <div className="step-summary">
            <StepSummariesList
            stepId={stepId}
            summaries={summaries} />

            {isStepsAdmin &&
            <Fragment>
                {displayStaging 
                ?   <StagingSum
                    stepId={stepId}
                    toggleDisplay={toggleStaging} />

                :   <LabelButton
                    label="הוספת סיכום"
                    icon="add"
                    onClick={() => setDisplayStaging(true)}
                    className="display-staging add-sum-button" />
                }
            </Fragment>
            }
        </div>
    )
}

export default StepSummary
