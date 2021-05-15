import React from 'react'
import getTableRowItem from './getTableRowItem'

function UsersTableRowItem({ value, type }) {
    return (
        <td>
           {getTableRowItem(value, type)} 
        </td>
    )
}

export default UsersTableRowItem
