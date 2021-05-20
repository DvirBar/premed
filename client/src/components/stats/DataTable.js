import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableSections } from '../../redux/actions/basedata';
import { getTableSectionsByPath } from '../../redux/selectors/statsinputs';
import TableHeaders from './data-table/table-headers/TableHeaders';
import Loadbar from '../layout/Loadbar';
import TableBody from './data-table/table-body/TableBody';
import { selectTableData } from '../../redux/stats/userdata/real-data/selectors';
import { isLoading } from '../../redux/loader/selectors';
import { USER_DATA_PATH } from '../../redux/actions/types';

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

    const loading = useSelector(isLoading(USER_DATA_PATH))

    const data = useSelector(selectTableData)


    return (
        <div className="table-container">
            {!tableSections
            ?   <Loadbar />
            :   <table 
                cellSpacing="1"
                className="data-table">
                    <TableHeaders 
                    matchColor={matchColor}
                    tableSections={tableSections}
                    ordering={ordering} />
                    
                    {loading
                    ?  <div className="data-table__body-load-wrapper">
                            <div>
                                <Loadbar />
                            </div>
                        </div>
                    :  data?.length > 0
                        ?   <TableBody 
                            data={data}
                            tableSections={tableSections}
                            matchColor={matchColor}
                            ordering={ordering} />
                        :   <p className="userdata-table-no-results">
                                <span>לא נמצאו תוצאות</span>
                            </p>
                    }
                </table>
            }
        </div>
    )
}

export default DataTable
