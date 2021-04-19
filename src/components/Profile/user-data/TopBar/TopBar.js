import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleEnabled } from '../../../../redux/actions/userdata'
import ToggleSwitch from '../../../common/ToggleSwitch';
import TableSelect from './TableSelect/TableSelect';
import DataPathsList from './DataPathsList/DataPathsList';
import CardContent from '../../../layout/CardContainer/CardContent';
import CardContainer from '../../../layout/CardContainer/CardContainer';

function TopBar({ data, tableId, changeTable, paths }) {
    const dispatch = useDispatch()

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
        <CardContainer>
            <CardContent>
                <div className="user-data__top-bar">
                    <TableSelect 
                    tables={data.tables}
                    table={tableId}
                    changeTable={changeTable} />

                    <div className="switch-block">
                        <p className="switch-name">הצגת הנתונים שלי בטבלה המרכזית:</p>
                        <ToggleSwitch
                        options={options}
                        onChange={toggleOptions}
                        value={data.tableData.enabled} />
                    </div>

                    <DataPathsList paths={paths} tableId={tableId} />        
                </div>
            </CardContent>
        </CardContainer>
    )
}

export default TopBar
