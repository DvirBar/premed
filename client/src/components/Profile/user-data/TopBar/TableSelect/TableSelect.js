import React from 'react'
import { useSelector } from 'react-redux';
import { getInternalTables } from '../../../../../redux/selectors/datatables';
import Dropdown from '../../../../common/Dropdown'

function TableSelect({ tableId, changeTable }) {
    const tables = useSelector(getInternalTables());
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
            onChange={changeTable} />
    )
}

export default TableSelect
