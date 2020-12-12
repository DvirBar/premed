import React from 'react'
import FormFragment from './FormFragment'
import { useSelector } from 'react-redux'
import { getGroupVals } from '../../../../redux/selectors/userdata'
import RemoveVals from './RemoveVals'

function GroupFields({ group }) {
    const groupVals = useSelector(getGroupVals(group._id))

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

            {groupVals.length !== 0 &&
                <RemoveVals 
                groupId={group._id}
                cusGroupParent={group.cusGroupParent}
                removeAll={true} />
            }
        </div>
    )
}

export default GroupFields
