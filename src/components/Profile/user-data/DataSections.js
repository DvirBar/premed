import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnisByPaths } from '../../../redux/actions/universities';
import { getStoredCalcs } from '../../../redux/actions/calculations';
import Loadbar from '../../layout/Loadbar';
import NavigateDataSections from './NavigateDataSections';
import DataSection from './DataSection';
import useMissingArgs from './useMissingArgs';
import useExecCalc from './useExecCalc';

function DataSections({ dataVals, paths }) {
    const dispatch = useDispatch()

    // Universities
    useEffect(() => {
        if(paths && paths.length !== 0) {
            dispatch(getUnisByPaths(paths))
        }
    }, [paths])
    
    const unisSelector = useSelector(state => state.unis);
    const unis = unisSelector.unis;
    const loadUnis = unisSelector.loading;

    // Change section on navigation
    const [selUni, setSelUni] = useState()
    const [selPath, setSelPath] = useState()

    const changeSection = (path, uni) => {
        setSelUni(uni)
        setSelPath(path)
    }

    // Get stored calcs
    useEffect(() => {
        dispatch(getStoredCalcs())
    }, [])

    const storedCalcs = useSelector(state => 
        state.calcs.storedCalcs)

    // Listen and execute calcs
    const missingArgs = useMissingArgs(storedCalcs, dataVals)
    
    useExecCalc(storedCalcs, missingArgs)

    if(loadUnis) {
        return <Loadbar />
    }

    return (
        <Fragment>
            <NavigateDataSections 
            paths={paths}
            unis={unis}
            changeSection={changeSection} />

            <DataSection 
            dataVals={dataVals}
            paths={paths}
            selPath={selPath}
            selUni={selUni} />
        </Fragment>
    )
}

export default DataSections
