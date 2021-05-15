import React from 'react'
import UsersTableBody from './UsersTableBody/UsersTableBody'
import UsersTableHeaders from './UsersTableHeaders/UsersTableHeaders'
import UsersTableLoadMore from './UsersTableLoadMore/UsersTableLoadMore'

function UsersTable({ filters }) {
    const headers= [
        {
            id: 'firstName',
            name: "שם"
        },
        {
            id: 'lastName',
            name: "שם משפחה"
        },
        {
            id: 'username',
            name: "שם משתמש"
        },
        {
            id: 'date_created',
            type: 'date',
            name: "תאריך יצירה"
        },
        {
            id: 'isAdmin',
            type: 'bool',
            name: "מנהל"
        },
        {
            id: 'blocked',
            type: 'bool',
            name: "חסום"
        }
    ]

    return (
        <table cellSpacing="0" className="users-table">
            <UsersTableHeaders headers={headers} />
            <UsersTableBody headers={headers} />
            <UsersTableLoadMore 
            colspan={headers.length}
            filters={filters} />
        </table>
    )
}

export default UsersTable
