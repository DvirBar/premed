import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldsByPaths } from '../../redux/actions/datafields';
import { useRouteMatch } from 'react-router-dom';
import { getUnisByPaths } from '../../redux/actions/universities';
import { getStoredCalcs } from '../../redux/actions/calculations';
import { getUsersDataByPathTable } from '../../redux/actions/userdata';
import { getFilteredSortedData } from '../../redux/reducers'
import Loadbar from '../layout/Loadbar';
import { getTables } from '../../redux/actions/datatables';

function PathStats() {
    let { params } = useRouteMatch()
    const { pathId } = params;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTables())
    }, [])

    useEffect(() => {
        dispatch(getFieldsByPaths(pathId))
        dispatch(getUnisByPaths(pathId))
        dispatch(getStoredCalcs())
    }, [pathId])

    // Tables
    const tablesSelector = useSelector(state => state.datatables)
    const loadTables = tablesSelector.loading
    const tables = tablesSelector.tables
    const [selTable, setSelTable] = useState()

    useEffect(() => {
        if(tables && tables.length !== 0 && !selTable) {
            setSelTable(tables.find(table => table.enabled)._id || tables[0]._id)
        }
    }, [tables, selTable])

    useEffect(() => {
        if(selTable) {
            dispatch(getUsersDataByPathTable(selTable, pathId))
        }
    }, [pathId, selTable])

    const changeTable = table => {
        setSelTable(table.value)
    }

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

    if(loadFields || loadUnis || loadTables) {
        return <Loadbar />
    }
    
    return (
        <div className="stats">
            {tables && tables.length !== 0 &&
                <TopBar 
                tables={tables}
                selTable={selTable}
                changeTable={changeTable} />
            }


            {tables && tables.find(table => table._id === selTable)?.url
            ?   <p className="external-link-container">
                    <a 
                    href={tables.find(table => table._id === selTable)?.url}
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
