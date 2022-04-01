import React from 'react'
import { useSelector } from 'react-redux';
import { getRelevantUserTables } from '../../../../../redux/stats/userdata/real-data/selectors';
import Dropdown from '../../../../common/Dropdown'

function TableSelect({ tableId, changeTable }) {
    const tables = useSelector(getRelevantUserTables);
    const options = tables.map(table => ({ 
        name: table.name,
        value: table._id
     }))
    return (
            <Dropdown
            options={options}
            defaultOption={options.find(option => 
                option.value === tableId)}
            title="טבלה"
            onChange={option => changeTable(option.value)} />
    )
}

export default TableSelect
