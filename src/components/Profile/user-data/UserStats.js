import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelTable } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import Calculator from './calculator/Calculator';
import DataSections from './DataSections';
import TopBar from './TopBar';

function UserStats({ data }) {
    const [paths, setPaths] = useState([])

    const dispatch = useDispatch()

    const changeTable = tableId => {
        dispatch(changeSelTable(tableId))
    }

    // Set selected table
    useEffect(() => {
        changeTable(data.tables.find(table => 
            table.table.enabled).table._id || data.tables[0].table._id)
    }, [data])

    const selTable = useSelector(state => state.userdata.selTable)

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
