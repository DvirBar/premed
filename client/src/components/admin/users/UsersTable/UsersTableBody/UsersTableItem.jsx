import React from 'react'
import UsersTableRowItem from './UsersTableRowItem'

function UsersTableItem({ headers, user }) {
    return (
        <tr>
            {headers.map(header => 
                <UsersTableRowItem 
                key={header.id}
                value={user[header.id]}
                type={header.type} />
            )}
        </tr>
    )
}

export default UsersTableItem
