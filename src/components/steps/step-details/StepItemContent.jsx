import React, { Fragment } from 'react';
import { useRouteMatch } from 'react-router-dom';
import StepContent from './StepContent';
import ShowTree from './ShowTree';
import JumpToStep from './jump-to-step/JumpToStep';
import useStepsGlobal from '../hooks/useStepsGlobal';
import UniContent from './UniContent';
import { isObjEmpty } from '../../../utils/objects';


function StepItemContent({ step }) {
    let { params } = useRouteMatch();
    const { pathId } = params;
    const { getUniContent, isFinal } = useStepsGlobal()
    

    const uniContent = getUniContent(step)

    const isStepFinal = isFinal(step)
    
    return (
        <div className="step-item">
            <ShowTree />
            { step &&
                <Fragment>
                    <StepContent 
                    isFinal={isStepFinal}
                    step={step} /> 
                    {!isObjEmpty(uniContent) &&
                        <UniContent 
                        content={uniContent}
                        pathId={pathId} />
                    }
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
