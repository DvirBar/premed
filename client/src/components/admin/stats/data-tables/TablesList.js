import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTables } from '../../../../redux/actions/datatables'
import Loadbar from '../../../layout/Loadbar'
import TableItem from './TableItem'

function TablesList() {
    const dispatch = useDispatch()
    const tableSelector = useSelector(state => state.datatables)
    const loading = tableSelector.loading
    const tables = tableSelector.tables

    useEffect(() => {
        dispatch(getTables())
    }, [])

    if(loading) {
        return <Loadbar />
    }

    return (
        <div className="tables-list">
            {tables.length !== 0 
            ?   tables.map(table => 
                    <TableItem
                    key={table._id}
                    table={table} />
                )
            :   <p className="no-resource-error">אין טבלאות</p>
            }

        </div>
    )
}

export default TablesList
