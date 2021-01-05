import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import NavigateDataSections from './NavigateDataSections';
import DataSection from './DataSection';
import useMissingArgs from './useMissingArgs';
import useExecCalc from './useExecCalc';
import { getAllStoredCalcs } from '../../../redux/selectors/statsinputs';
import { getUnisByPaths } from '../../../redux/selectors/unis';
import { getDataVals } from '../../../redux/selectors/userdata';
import useDataValidation from './data-block/useDataValidation';

function DataSections({ paths }) {
    const unis = useSelector(getUnisByPaths(paths.map(path => 
        path._id)))

    // Change section on navigation
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState()

    const changeSection = (path, uni) => {
        setSelUni(uni)
        setSelPath(path)
    }

    const storedCalcs = useSelector(getAllStoredCalcs)
    const dataVals = useSelector(getDataVals)

    // Listen and execute calcs
    // const missingArgs = useMissingArgs(storedCalcs, dataVals, 'jew')

    useDataValidation(storedCalcs, dataVals)
 
    useExecCalc()

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
