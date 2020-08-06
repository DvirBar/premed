import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InlineSelect from '../../common/InlineSelect';
import AddStep from './AddStep';
import StepsTree from './StepsTree';

function StepsAdmin() {
    const [paths, setPaths] = useState([]);
    const [steps, setSteps] = useState([]);
    const [selected, setSelected] = useState({})
    const [selPathSteps, setSelPathSteps] = useState([])

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
            setSelected({ name: paths[0].name, value: paths[0]._id })
    }, [paths])

    // Listen to selected and change steps when selected is change
    useEffect(() => {
        setSelPathSteps(steps.filter(step => (
            step.path === selected.value
        )))
    }, [selected, steps])


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
                selected={selected}
                setSelected={setSelected} />
            </p>
            <div className="steps-block">
                {selected.value &&
                    <AddStep 
                    path={selected}
                    steps={selPathSteps} />
                }
                
                <StepsTree 
                steps={selPathSteps} />
            </div>
        </div>
    )
}

export default StepsAdmin
