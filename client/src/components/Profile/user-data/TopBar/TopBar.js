import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleEnabled } from '../../../../redux/actions/userdata'
import TableSelect from './TableSelect/TableSelect';
import DataPathsList from './DataPathsList/DataPathsList';
import CardContent from '../../../layout/Containers/CardContainer/CardContent';
import CardContainer from '../../../layout/Containers/CardContainer/CardContainer';
import SelectPaths from './SelectPaths/SelectPaths';
import DisplayInTable from './DisplayInTable/DisplayInTable';

function TopBar({ data, tableId, changeTable, paths }) {
    const dispatch = useDispatch()
    const toggleOptions = () => {
        dispatch(toggleEnabled(tableId))
    }
 
    return (
        <CardContainer>
            <CardContent>
                <div className="user-data__top-bar">
                    <TableSelect 
                    tables={data.tables}
                    tableId={tableId}
                    changeTable={changeTable} />

                    <DisplayInTable 
                    onChange={toggleOptions}
                    value={data.tableData.enabled} />
       
                    <DataPathsList paths={paths} tableId={tableId} />        
                </div>
            </CardContent>
            <SelectPaths paths={paths} />
        
        </CardContainer>
    )
}

export default TopBar
