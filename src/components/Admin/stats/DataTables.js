import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStatsInputs } from '../../../redux/actions/basedata'
import { getAllPaths } from '../../../redux/selectors/paths'
import AddTable from './data-tables/AddTable'
import TablesList from './data-tables/TablesList'

function DataTables() {
    const paths = useSelector(getAllPaths)
    const pathIds = paths?.map(path => path._id)
    const dispatch = useDispatch()

    useEffect(() => {
        if(pathIds && pathIds.length > 0)
        dispatch(getStatsInputs(pathIds))
    }, [pathIds])

    return (
        <div>
            <AddTable />
            <TablesList />
        </div>
    )
}

export default DataTables
