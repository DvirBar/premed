import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InlineSelect from '../../common/InlineSelect';
import AddStep from './AddStep';
import StepsTree from './StepsTree';
import EditStep from './EditStep';

function StepsAdmin() {
    // Local state
    const [paths, setPaths] = useState([]);
    const [steps, setSteps] = useState([]);
    const [selPath, setSelPath] = useState({})
    const [selPathSteps, setSelPathSteps] = useState([])
    const [selStep, setSelStep] = useState({})

    // Load state from redux
    const selPaths = useSelector(state => state.paths);
    const selSteps = useSelector(state => state.steps);
    const loadPaths = selPaths.loading;
    const fetchedPaths = selPaths.paths;
    const loadSteps = selSteps.loading;
    const fetchedSteps = selSteps.steps;

    useEffect(() => {
        setPaths(fetchedPaths);
        setSteps(fetchedSteps);
    }, [fetchedPaths, fetchedSteps])

    // Create default selected path
    useEffect(() => {
        if(paths.length !== 0) 
            setSelPath({ name: paths[0].name, value: paths[0]._id })
    }, [paths])

    // Listen to selected path and change steps and init selected step
    useEffect(() => {
        setSelPathSteps(steps.filter(step => (
            step.path === selPath.value
        )))
    }, [selPath, steps])

    useEffect(() => {
        setSelStep({})
    }, [selPath])

    // Select step 
    const selectStep = step => {
        setSelStep(step)
    }


    if(paths.length === 0)
        return (
        <div className="no-resource-error">
            <p>יש להוסיף תחילה מסלולים</p>
        </div>
        )

    else if(loadPaths || loadSteps)
        return <p>Loading...</p>
    
    return (
        <div className="steps-admin">
            <p className="path-select">
                <InlineSelect 
                options={paths}
                selected={selPath}
                setSelected={setSelPath} />
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
                <EditStep
                selStep={selStep}
                steps={selPathSteps} />
            }
        </div>
    )
}

export default StepsAdmin
