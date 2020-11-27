import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelTable, getOneUserData } from '../../../redux/actions/userdata';
import Loadbar from '../../layout/Loadbar';
import DataSections from './DataSections';
import TopBar from './TopBar';

function UserStats({ data, selTable }) {
    const [paths, setPaths] = useState([])

    const dispatch = useDispatch()

    const changeTable = table => {
        dispatch(getOneUserData(table.value))
    }

    // Get table paths
    useEffect(() => {
        setPaths(data.tableData.paths)
    }, [data])

    if(!paths || paths.length === 0)
        return <Loadbar />
    
    return (
        <Fragment>
            <TopBar 
            data={data} 
            changeTable={changeTable} 
            tableId={selTable}
            paths={paths} />
            
            <DataSections  
            paths={paths} />
        </Fragment>
    )
}

export default UserStats
