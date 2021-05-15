import React from 'react'

function UsersTableHeaders({ headers }) {
    return (
        <thead>
            <tr className="users-table__headers">
                {headers.map(header => 
                    <th key={header.id}>
                        {header.name}
                    </th>    
                )}
            </tr>
        </thead>
    )
}

export default UsersTableHeaders
