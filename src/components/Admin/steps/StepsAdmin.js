import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loadbar from '../../layout/Loadbar';
import { getUnisByPath } from '../../../redux/selectors/unis';
// import StepsEditSeciton from './StepsEditSection/StepsEditSeciton';
import { pathsSelector } from '../../../redux/selectors/paths';
import StepsContent from './StepsContent/StepsContent';

function StepsAdmin() {
    // Get paths
    const {
        paths,
        loading
    } = useSelector(pathsSelector)

    const [selPath, setSelPath] = useState({});

    const selectPath = selected => {
        setSelPath(selected)
    }

    const unis = useSelector(getUnisByPath(selPath?.value))

    const [selStep, setSelStep] = useState({});

    // Select step 
    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()
        setSelStep(step)
    }

    if(loading || !paths)
        return <Loadbar />
    
    return (
        <div className="steps-admin">
                <StepsContent
                paths={paths}
                unis={unis}
                selPath={selPath}
                selectPath={selectPath}
                selectStep={selectStep} />
            {/* {Object.keys(selStep).length !== 0 &&
                <StepsEditSeciton />
            } */}
        </div>
    )
}

export default StepsAdmin
