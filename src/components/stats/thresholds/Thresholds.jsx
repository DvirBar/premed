import React from 'react'
import { useSelector } from 'react-redux'
import { getThreshCalcs } from '../../../redux/selectors/datafields'
import { getTableById } from '../../../redux/selectors/datatables'
import { getUnisFields, getUnisFieldsByPath } from '../../../redux/selectors/unis'
import UniItem from './UniItem'


function Thresholds({ pathId, tableId }) {
    const table = useSelector(state => 
        getTableById(state, tableId))

    const fields = useSelector(state => 
        getThreshCalcs(state, table.thresholds))

    const unis = useSelector(state => 
        getUnisFields(state.unis.unis, fields))
    return (
        <div className="thresholds">
            <div className="unis-list">
            {unis.map(uni => 
                <UniItem
                key={uni._id}
                uni={uni}
                uniFields={fields.filter(field => 
                field.university === uni._id)}
                tableId={table._id} />)}
            </div>
        </div>
    )
}

export default Thresholds
