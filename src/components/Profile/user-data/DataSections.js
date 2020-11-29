import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loadbar from '../../layout/Loadbar';
import NavigateDataSections from './NavigateDataSections';
import DataSection from './DataSection';
import useMissingArgs from './useMissingArgs';
import useExecCalc from './useExecCalc';
import { getStatsInputs } from '../../../redux/actions/basedata';
import { getAllStoredCalcs } from '../../../redux/selectors/statsinputs';
import { getUnisByPaths } from '../../../redux/selectors/unis';

function DataSections({ paths }) {
    const unis = useSelector(getUnisByPaths(paths.map(path => path._id)))

    // Change section on navigation
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState()

    const changeSection = (path, uni) => {
        setSelUni(uni)
        setSelPath(path)
    }

    console.log(unis);

    const storedCalcs = useSelector(getAllStoredCalcs)

    // // Listen and execute calcs
    // const missingArgs = useMissingArgs(storedCalcs, dataVals)
    
    // useExecCalc(missingArgs)

    return (
        <Fragment>
            <NavigateDataSections 
            paths={paths}
            unis={unis}
            changeSection={changeSection} />

            <DataSection 
            paths={paths}
            selPath={selPath}
            selUni={selUni} />
        </Fragment>
    )
}

export default DataSections
