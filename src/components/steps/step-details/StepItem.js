import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import StepContent from './StepContent';
import { getStepById } from '../../../redux/selectors/steps';
import ShowTree from './ShowTree';
import JumpToStep from './jump-to-step/JumpToStep';

function StepItem() {
    let { params } = useRouteMatch();
    const { stepId } = params;
    
    const step = useSelector(getStepById(stepId))

    return (
        <div className="step-item">
            <ShowTree />
            { step &&
                <Fragment>
                    <StepContent step={step} /> 
                    <JumpToStep
                    step={step} />
                </Fragment>
            }
            
        </div>
    )
}

export default StepItem
