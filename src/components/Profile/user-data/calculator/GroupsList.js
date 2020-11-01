import React, { Fragment } from 'react'
import FieldItem from './FieldItem'
import GroupItem from './GroupItem'

function GroupsList({ groups, fields }) {
    return (
        <div className="groups-list">
            {groups.map(group => 
                <GroupItem 
                key={group._id} 
                group={group}
                fields={fields.filter(field =>
                    field.group?._id === group._id)} />

            )}
        </div>
    )
}

export default GroupsList
