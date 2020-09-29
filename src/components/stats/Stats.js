import React, { useEffect } from 'react';
import TopBar from './TopBar';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldsByPaths } from '../../redux/actions/datafields';
import { useRouteMatch } from 'react-router-dom';
import { getUnisByPaths } from '../../redux/actions/universities';
import { getStoredCalcs } from '../../redux/actions/calculations';
import { getUsersDataByPath } from '../../redux/actions/userdata';
import { getFilteredSortedData } from '../../redux/reducers'
import Loadbar from '../layout/Loadbar';

function Stats() {
    let { params } = useRouteMatch()
    const { pathId } = params;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFieldsByPaths(pathId))
        dispatch(getUnisByPaths(pathId))
        dispatch(getUsersDataByPath(pathId))
        dispatch(getStoredCalcs())
    }, [pathId])

    // Fields
    const fieldsSelector = useSelector(state => state.datafields)
    const loadFields = fieldsSelector.loading
    const { fields } = fieldsSelector
    
    // Unis
    const unisSelector = useSelector(state => state.unis)
    const loadUnis = unisSelector.loading
    const { unis } = unisSelector
    
    // User data
    const data = useSelector(state => getFilteredSortedData(state.userdata))
    const loadData = useSelector(state => state.userdata.loading)

    if(loadFields || loadUnis || loadData) {
        return <Loadbar />
    }
    
    return (
        <div className="stats">
            <TopBar />

            <DataTable 
            fields={fields}
            unis={unis} 
            data={data} />
        </div>
    )
}

export default Stats
