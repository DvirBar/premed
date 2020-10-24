import React, { useState, useEffect, Fragment } from 'react';
import Loadbar from '../../layout/Loadbar';
import DataSections from './DataSections';
import TopBar from './TopBar';

function UserStats({ data }) {
    const [selTable, setSelTable] = useState()
    const [paths, setPaths] = useState([])

    // Set selected table
    useEffect(() => {
        setSelTable(data.tables.find(table => 
            table.table.enabled).table._id || data.tables[0].table._id)
    }, [data])

    const changeTable = table => {
        setSelTable(table.value)
    }

    // Get table paths
    useEffect(() => {
        setPaths(data.tables.find(table => 
            table.table._id === selTable)?.paths)
    }, [selTable, data])

    // Filter data vals by table
    const [dataVals, setDataVals] = useState([])

    useEffect(() => {
        setDataVals(data.tables.find(table => 
            table.table._id === selTable)?.dataVals)
    }, [data, selTable])


    if(!selTable || !paths || paths.length === 0)
        return <Loadbar />
    
    return (
        <Fragment>
            <TopBar 
            data={data} 
            changeTable={changeTable} 
            tableId={selTable}
            paths={paths} />
            {/* (paths.find(curPath => 
                    curPath._id === field.path) || !field.path)  */}
            
            <DataSections 
            dataVals={dataVals} 
            paths={paths} />
        </Fragment>
    )
}

export default UserStats
