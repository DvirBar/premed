import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StepsTree from './StepsTree';

function Steps() {
    let history = useHistory();
    let { params, path } = useRouteMatch();
    const { pathId } = params
    let newPath = path.replace(/:pathId/g, pathId)

    const steps = useSelector(state => 
        state.steps.steps.filter(step => step.path === pathId))
    
    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()
        history.push(`${newPath}/${step._id}`)
    }

    if(!steps)
        return <p>Loading ...</p>

    return (
        <div>
            <StepsTree 
            steps={steps}
            selectStep={selectStep} />
        </div>
    )
}

export default Steps
