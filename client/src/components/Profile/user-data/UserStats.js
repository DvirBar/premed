import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOneUserData } from '../../../redux/actions/userdata';
import ListLayout from '../../layout/ListLayout/ListLayout';
import Loadbar from '../../layout/Loadbar';
import DataSections from './DataSections';
import TopBar from './TopBar/TopBar';
import StatsExplanation from './StatsExplanation'
import TableDisabled from './Informatives/TableDisabled';

function UserStats({ 
    data, 
    selTable, 
    setDisplayCalc
}) {
    const [paths, setPaths] = useState([])

    const dispatch = useDispatch()

    const changeTable = tableId => {
        dispatch(getOneUserData(tableId))
    }

    // Get table paths
    useEffect(() => {
        setPaths(data.tableData.paths)
    }, [data])

    if(!paths || paths.length === 0)
        return <Loadbar />
    
    return (
        <ListLayout className="user-data">
            <TableDisabled changeTable={changeTable} />
            <TopBar 
            data={data} 
            changeTable={changeTable} 
            tableId={selTable}
            paths={paths} />
            <StatsExplanation 
            setDisplayCalc={setDisplayCalc} />
            <DataSections  
            paths={paths} />
        </ListLayout>
    )
}

export default UserStats
