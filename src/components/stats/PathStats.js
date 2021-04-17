import React, { Fragment, useEffect } from 'react';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getStoredCalcs } from '../../redux/actions/calculations';
import { getUsersDataByPathTable } from '../../redux/actions/userdata';
import Loadbar from '../layout/Loadbar';
import { getTableById } from '../../redux/selectors/datatables';

function PathStats({ pathId, tableId }) {
    const table = useSelector(getTableById(tableId))

    const dispatch = useDispatch()

    useEffect(() => {
        if(tableId) {
            dispatch(getUsersDataByPathTable(tableId, pathId))
        }
    }, [pathId, tableId])

    // User data
    const loadData = useSelector(state => state.userdata.loading)

    const urlTableTitle = 'הצגת טבלת הנתונים ' + table?.name
    
    return (
        <Fragment>
            {table?.url
            ?   <p className="external-link-container">
                    <a 
                    href={table?.url}
                    target="_blank"
                    className="external-table-link"
                    rel="noopener noreferrer">{urlTableTitle}</a>
                </p>
            
            :  loadData
                ? <Loadbar />
                : <DataTable 
                    pathId={pathId} />
            }

        </Fragment>
    )
}

export default PathStats
