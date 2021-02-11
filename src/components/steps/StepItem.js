import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Modal from '../layout/Modal';
import StepsTree from './StepsTree/StepsTree';
import StepContent from './StepContent';
import PathSteps from './‎PathSteps';
import { getStepById } from '../../redux/selectors/steps';
import ShowTree from './ShowTree';

function StepItem() {
    let { params } = useRouteMatch();
    const { stepId } = params;
    
    const step = useSelector(getStepById(stepId))

    return (
        <div>
            <ShowTree />
            { step &&
                <StepContent step={step} /> 
            }
        </div>
    )
}

export default StepItem
