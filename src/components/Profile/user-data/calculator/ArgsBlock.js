import React from 'react'
import { useSelector } from 'react-redux'
import { getUnisByInputs } from '../../../../redux/selectors/unis'
import DataBlock from '../DataBlock'

function ArgsBlock({ 
    fields, 
    groups, 
    calcs }) {

    const getChildren = group => {
        return groups.filter(thisGroup => 
            thisGroup.parent === group._id)
    }

    const unis = useSelector(getUnisByInputs(
        fields,
        groups,
        calcs
    ))
   
    return (
        <div className="args-fields-block">
            <div className="no-groups">
                <DataBlock 
                fields={fields.filter(field => 
                    !field.uni)}
                calcs={calcs.filter(calc => 
                    !calc.uni)} />   
            </div>

            {unis.map(uni => 
                <DataBlock
                key={uni._id}
                title={uni.name}
                fields={fields.filter(field => 
                    field.uni === uni._id)}
                calcs={calcs.filter(calc => 
                    calc.uni === uni._id)} />            
            )}

            {groups.length > 0 &&
            groups.map(group => 
                !group.parent && 
                    <DataBlock
                    key={group._id}
                    title={group.name}
                    fields={group.fields}
                    group={group}
                    groups={getChildren(group)}
                    getChildren={getChildren} />
                )
            }
        </div>
    )
}

export default ArgsBlock
