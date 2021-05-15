import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../../../redux/actions/auth'
import { selectUsers } from '../../../../../redux/auth/selectors'
import { GET_USERS } from '../../../../../redux/auth/types'
import { isLoading } from '../../../../../redux/loader/selectors'
import Loadbar from '../../../../layout/Loadbar'
import UsersTableItem from './UsersTableItem'

function UsersTableBody({ headers, filters }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers({ 
            count: true
        }))
    }, [])

    const users = useSelector(selectUsers)
    const loading = useSelector(isLoading(GET_USERS))

    if(loading) {
        return (
            <tr>
                <td colspan={headers.length}>
                    <Loadbar />
                </td>
            </tr>
        )
    }

    return (
        <tbody>
            {users.map(user => 
                <UsersTableItem 
                key={user._id}
                user={user}
                headers={headers} />)}
        </tbody>
    )
}

export default React.memo(UsersTableBody)
