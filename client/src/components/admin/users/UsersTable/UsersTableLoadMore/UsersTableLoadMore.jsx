import React from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMoreUsers } from '../../../../../redux/actions/auth'
import { selectUsers, selectUsersFinished } from '../../../../../redux/auth/selectors'
import { GET_USERS, GET_USERS_LOAD_MORE } from '../../../../../redux/auth/types'
import { isLoading } from '../../../../../redux/loader/selectors'
import Loadbar from '../../../../layout/Loadbar'

function UsersTableLoadMore({ colspan, filters }) {
    const users = useSelector(selectUsers)
    const finished = useSelector(selectUsersFinished)
    
    const dispatch = useDispatch()

    const loadMore = () => {
        dispatch(getMoreUsers({
            ...filters,
            lastUserId: users[users.length - 1]?._id
        }))
    }

    const allLoading = useSelector(isLoading(GET_USERS)) 
    const loading = useSelector(isLoading(GET_USERS_LOAD_MORE))
    
    if(finished || allLoading) {
        return <Fragment></Fragment>
    }

    return (
        <tfoot>
            <tr 
            colSpan={colspan}
            onClick={loadMore}
            className="users-table__load-more">
                <td 
                colSpan={colspan}> 
                    {loading
                    ?   <Loadbar small={true} />
                    :   <span>
                            טעינת משתמשים נוספים
                        </span>
                    }
                </td>
            </tr>
        </tfoot>
    )
}

export default UsersTableLoadMore
