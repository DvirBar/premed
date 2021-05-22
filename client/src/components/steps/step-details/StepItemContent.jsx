import React, { Fragment } from 'react';
import StepContent from './StepContent';
import ShowTree from './ShowTree';
import JumpToStep from './jump-to-step/JumpToStep';
import useStepsGlobal from '../hooks/useStepsGlobal';



function StepItemContent({ step }) {
    const { isFinal } = useStepsGlobal()

    const isStepFinal = isFinal(step)
    
    return (
        <div className="step-item">
            <ShowTree />
            { step &&
                <Fragment>
                    <StepContent 
                    isFinal={isStepFinal}
                    step={step} /> 
                    
                    {!isStepFinal &&
                        <JumpToStep
                        step={step} />                        
                    }
                </Fragment>
            }
            
        </div>
    )
}

export default StepItemContent
