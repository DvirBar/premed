import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleEnabled } from '../../../redux/actions/userdata'
import ToggleSwitch from '../../common/ToggleSwitch';
import TableSelect from './TableSelect';
import DataPathsList from './DataPathsList';

function TopBar({ data, tableId, changeTable, paths }) {
    const dispatch = useDispatch()
    const [enabled, setEnabled] = useState(false);
    
    useEffect(() => {
        setEnabled(data.tableData.enabled)
    }, [data])

    const options = [
        {
            name: 'אל תציג',
            value: false
        },
        {
            name: 'הצג',
            value: true,
        },
    ]

    const toggleOptions = () => {
        dispatch(toggleEnabled(tableId))
    }


    return (
        <div className="top-bar">
            <TableSelect 
            tables={data.tables}
            table={tableId}
            changeTable={changeTable} />

            <div className="switch-block">
                <p className="switch-name">הצגת הנתונים שלי בטבלה המרכזית:</p>
                <ToggleSwitch
                options={options}
                onChange={toggleOptions}
                value={enabled} />
            </div>

            <DataPathsList paths={paths} />
        </div>
    )
}

export default TopBar
