import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import DataSection from './DataSection';
import useExecCalc from './useExecCalc';
import { getAllStoredCalcs } from '../../../redux/selectors/statsinputs';
import { getDataVals } from '../../../redux/selectors/userdata';
import useDataValidation from './data-block/useDataValidation';

function DataSections({ paths }) {
    // Change section on navigation
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState('six-year')

    const storedCalcs = useSelector(getAllStoredCalcs)
    const dataVals = useSelector(getDataVals)

    useDataValidation(storedCalcs, dataVals)
 
    useExecCalc()

    return (
        <Fragment>
            {/* <NavigateDataSections 
            paths={paths}
            unis={unis}
            changeSection={changeSection} /> */}

            <DataSection 
            paths={paths}
            selPath={selPath} />
        </Fragment>
    )
}

export default DataSections
