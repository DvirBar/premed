import React, { Fragment } from 'react'
import FormFragment from './FormFragment'

function GroupFields({ group }) {
    return (
        <div className="group-fields">
            <div className="group-name">
                {group.name}
            </div>
            {group.fields?.map(field =>
                <FormFragment
                key={field._id}
                field={field}
                isCalc={false}
                group={group} />
            )}
        </div>
    )
}

export default GroupFields
