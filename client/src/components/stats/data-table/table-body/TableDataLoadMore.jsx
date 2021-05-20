import React from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { USER_DATA_TABLE_LOAD_MORE } from '../../../../redux/actions/types'
import { getUsersDataByPathTable } from '../../../../redux/actions/userdata'
import { isLoading } from '../../../../redux/loader/selectors'
import { selectTableDataFull } from '../../../../redux/stats/userdata/real-data/selectors'
import Loadbar from '../../../layout/Loadbar'

function TableDataLoadMore() {
    const {
        filters,
        finished,
        lastId
    } = useSelector(selectTableDataFull)

    const {
        tableId,
        pathId
    } = useParams()

    const dispatch = useDispatch()

    const loadMore = () => {
        dispatch(getUsersDataByPathTable(tableId, pathId, filters, lastId))
    }

    const loading = useSelector(isLoading(USER_DATA_TABLE_LOAD_MORE))

    if(finished) {
        return <Fragment></Fragment>
    }

    return (
        <div
        className="table-data-load-more">
            {loading
            ?   <div>
                    <div className="table-data-load-more__loading">
                        <Loadbar small={true}/>&nbsp;
                        טוען נתונים נוספים
                    </div>
                </div>
            :   <div 
                onClick={() => loadMore()}
                className="table-data-load-more__button">
                    טעינת נתונים נוספים 
                </div>
            }
        </div>
    )
}

export default TableDataLoadMore
