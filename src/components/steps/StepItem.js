import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Modal from '../layout/Modal';
import StepsTree from './StepsTree/StepsTree';
import StepContent from './StepContent';

function StepItem() {
    let { params, path } = useRouteMatch();
    let history = useHistory();
    const { pathId, stepId } = params;
    path = path.replace(/:pathId/g, pathId)

    const steps = useSelector(state => 
        state.steps.steps.filter(step => step.path === pathId))
    
    const step = steps.find(step => step._id === stepId)

    const selectStep = selStep => {
        path = path.replace(/:stepId/g, selStep._id)
        setDisplayModal(false)
        history.push(path)
    }

    const [displayModal, setDisplayModal] = useState(false)

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <div>
            <Modal
            display={displayModal}
            toggleModal={toggleModal}
            title={"מסלול הקבלה"}>
                <StepsTree 
                steps={steps}
                selectStep={selectStep} />
            </Modal>
            <button onClick={() => toggleModal(true)}>הצג מסלול</button>
            { step &&
                <StepContent selStep={step} /> 
            }
        </div>
    )
}

export default StepItem
