import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loadbar from '../../layout/Loadbar';
import { getUnisByPath } from '../../../redux/selectors/unis';
import StepsEditSeciton from './StepsEditSection/StepsEditSeciton';
import { pathsSelector } from '../../../redux/selectors/paths';
import StepsContent from './StepsContent/StepsContent';
import StepsProvider from '../../steps/StepsContext';

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

    if(loading || !paths)
        return <Loadbar />

    return (
        <StepsProvider isAdmin={true}>
            <div className="steps-admin">
                <StepsContent
                paths={paths}
                unis={unis}
                selPath={selPath}
                selectPath={selectPath} />

                <StepsEditSeciton />
            </div>
        </StepsProvider>
    )
}

export default StepsAdmin
