import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableSections } from '../../redux/actions/basedata';
import { getTableSectionsByPath } from '../../redux/selectors/statsinputs';
import TableHeaders from './data-table/table-headers/TableHeaders';
import Loadbar from '../layout/Loadbar';
import TableBody from './data-table/table-body/TableBody';

function DataTable({ pathId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTableSections())
    }, [])

    const tableSections = useSelector(
        getTableSectionsByPath(pathId))

    const matchColor = (uni, isHeader) => {
        return {
            backgroundColor: uni._id === 'no-uni'
            ? isHeader ? '#486974' : '#48697460'
            : isHeader ? uni.color : uni.color + '60'
        }
    }

    const ordering = useSelector(state => 
        state.userdata.ordering);
    
    if(!tableSections) {
        return <Loadbar />
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <TableHeaders 
                matchColor={matchColor}
                tableSections={tableSections}
                ordering={ordering}
                />
                <TableBody 
                tableSections={tableSections}
                matchColor={matchColor}
                ordering={ordering} />
            </table>
        </div>
    )
}

export default DataTable
