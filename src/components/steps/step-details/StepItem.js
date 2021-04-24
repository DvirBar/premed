import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import StepContent from './StepContent';
import { getStepById } from '../../../redux/selectors/steps';
import ShowTree from './ShowTree';
import JumpToStep from './jump-to-step/JumpToStep';
import useStepsGlobal from '../hooks/useStepsGlobal';
import UniContent from './UniContent';
import { isObjEmpty } from '../../../utils/objects';

function StepItem() {
    let { params } = useRouteMatch();
    const { pathId, stepId } = params;
    const { getUniContent } = useStepsGlobal()
    
    const step = useSelector(getStepById(stepId))
    const uniContent = getUniContent(step)

    
    return (
        <div className="step-item">
            <ShowTree />
            { step &&
                <Fragment>
                    <StepContent step={step} /> 
                    {!isObjEmpty(uniContent) &&
                        <UniContent 
                        content={uniContent}
                        pathId={pathId} />
                    }
                    <JumpToStep
                    step={step} />
                </Fragment>
            }
            
        </div>
    )
}

export default StepItem
