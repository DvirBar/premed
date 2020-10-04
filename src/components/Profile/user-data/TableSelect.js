import React, { useEffect, useState } from 'react'
import Dropdown from '../../common/Dropdown'

function TableSelect({ tables, table, changeTable }) {
    const [tableOptions, setTableOptions] = useState([]);

    useEffect(() => {
        setTableOptions(tables.map(table => ({
            name: table.name,
            value: table._id
        })))
    }, [tables])


    return (
            <Dropdown
            options={tableOptions}
            defaultOption={tableOptions.find(option =>
                option.value === table)}
            title="טבלה"
            onChange={changeTable} />
    )
}

export default TableSelect
