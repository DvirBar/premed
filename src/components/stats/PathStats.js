import React, { useEffect } from 'react';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldsByPaths } from '../../redux/actions/datafields';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getUnisByPaths } from '../../redux/actions/universities';
import { getStoredCalcs } from '../../redux/actions/calculations';
import { getUsersDataByPathTable } from '../../redux/actions/userdata';
import { getFilteredSortedData } from '../../redux/reducers'
import Loadbar from '../layout/Loadbar';
import { getTableById } from '../../redux/selectors/datatables';

function PathStats() {
    const { pathId, tableId } = useParams();

    const table = useSelector(state => getTableById(state, tableId))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFieldsByPaths(pathId))
        dispatch(getUnisByPaths(pathId))
        dispatch(getStoredCalcs())
    }, [pathId])

    useEffect(() => {
        if(tableId) {
            dispatch(getUsersDataByPathTable(tableId, pathId))
        }
    }, [pathId, tableId])

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

    if(loadFields || loadUnis) {
        return <Loadbar />
    }
    
    return (
        <div className="stats">
            {table.url
            ?   <p className="external-link-container">
                    <a 
                    href={table.url}
                    target="_blank"
                    className="external-table-link"
                    rel="noopener noreferrer">הצגת טבלת הנתונים</a>
                </p>
            
            :  loadData
                ? <Loadbar />
                : <DataTable 
                    fields={fields}
                    unis={unis} 
                    data={data} />
            }

        </div>
    )
}

export default PathStats
