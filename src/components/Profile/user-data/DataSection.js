import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStatsInputs } from '../../../redux/actions/basedata';
import { statsInputsSelector } from '../../../redux/selectors/statsinputs';
import { getUnisByPath } from '../../../redux/selectors/unis';
import Loadbar from '../../layout/Loadbar';
import DataGroup from './DataGroup';

function DataSection({ paths, selPath }) {
    const dispatch = useDispatch()

    // Dispatch actions to get data
    useEffect(() => {
        dispatch(getStatsInputs(paths.map(path => path._id)))
    }, [paths])
    console.log(paths);
    const {
        loading 
    } = useSelector(statsInputsSelector)

    const unis = useSelector(getUnisByPath(selPath))

    if(loading) {
        return <Loadbar />
    }
    
    return (
        <Fragment>
            <DataGroup 
            pathId={selPath} />

            {unis.map(uni => 
                <DataGroup
                key={uni._id}
                uni={uni}
                pathId={selPath} />
            )}
        </Fragment>
    )
}

export default DataSection
