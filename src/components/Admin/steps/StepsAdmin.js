import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loadbar from '../../layout/Loadbar';
import InlineSelect from '../../common/InlineSelect';
import AddStep from './AddStep';
import StepsTree from '../../steps/StepsTree';
import EditStep from './EditStep';
import DeleteStep from './DeleteStep';

function StepsAdmin() {
    const [selPath, setSelPath] = useState({});
    const [selPathSteps, setSelPathSteps] = useState([]);
    const [selStep, setSelStep] = useState({});
    const [pathOptions, setPathOptions] = useState([])

    // Load state from redux
    const selPaths = useSelector(state => state.paths);
    const selSteps = useSelector(state => state.steps);
    const loadPaths = selPaths.loading;
    const paths = selPaths.paths;
    const loadSteps = selSteps.loading;
    const steps = selSteps.steps;

    useEffect(() => {
        setPathOptions(paths.map(path => ({
            name: path.name,
            value: path._id
        })))
    }, [paths])


    // Listen to selected path and change steps and init selected step
    useEffect(() => {
        setSelPathSteps(steps.filter(step => (
            step.path === selPath.value
        )))
        setSelStep({})
    }, [selPath, steps])

    useEffect(() => {
        setSelStep({})
    }, [selPath])

    // Select step 
    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()
        setSelStep(step)
    }

    const selectPath = selected => {
        setSelPath(selected)
    }

    if(paths.length === 0)
        return (
        <div className="no-resource-error">
            <p>יש להוסיף תחילה מסלולים</p>
        </div>
        )

    else if(loadPaths || loadSteps)
        return <Loadbar />
    
    return (
        <div className="steps-admin">
            <p className="path-select">
                <InlineSelect 
                options={pathOptions}
                selected={selPath}
                selectOption={selectPath} />
            </p>
            <div className="steps-block">
                {selPath.value &&
                    <AddStep 
                    path={selPath}
                    steps={selPathSteps} />
                }
                
                <StepsTree 
                steps={selPathSteps}
                selectStep={selectStep} />
            </div>
            {Object.keys(selStep).length !== 0 &&
                <div>
                    <EditStep
                    selStep={selStep}
                    steps={selPathSteps} />
                    <DeleteStep stepId={selStep._id} />
                </div>
            }
        </div>
    )
}

export default StepsAdmin
