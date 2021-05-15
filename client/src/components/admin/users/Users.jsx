import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserCount } from '../../../redux/auth/selectors'
import UsersFilters from './UsersFilters/UsersFilters'
import UsersTable from './UsersTable/UsersTable'

function Users() {
    const [filters, setFilters] = useState({})
    const count = useSelector(selectUserCount)

    return (
        <div className="admin-users">
            <div className="admin-users__general-stats">
                סה"כ מספר משתמשים: {count}
            </div>

            <UsersFilters 
            filters={filters}
            setFilters={setFilters} />

            <div className="users-table-wrapper">
                <UsersTable
                filters={filters} />
            </div>
            
        </div>
    )
}

export default Users
