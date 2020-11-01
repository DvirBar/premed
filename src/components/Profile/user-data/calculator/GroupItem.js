import React from 'react'
import { useSelector } from 'react-redux'
import FieldItem from './FieldItem'
import FieldsList from './FieldsList'

function GroupItem({ group, fields }) {
    return (
        <div className="group-item">
            <span className="calc-group-name">
                {group.name}
            </span>
            <FieldsList fields={fields} />
        </div>
    )
}

export default GroupItem
