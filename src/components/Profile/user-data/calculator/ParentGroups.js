import React, { Fragment, useEffect, useState } from 'react'
import GroupsList from './GroupsList'

function ParentGroups({ fields }) {
    const [allGroups, setAllGroups] = useState([])
    useEffect(() => {
        let fieldsGroups = []
        // Get direct fields group
        for(let field of fields) {
            if(field.group && !fieldsGroups.find(group => 
                group._id === field.group._id))
                fieldsGroups.push(field.group)
        }

        let ancestors = []
        for(let group of fieldsGroups) {
            if(group.parent 
                && !ancestors.find(anc => anc._id === group.parent._id)) {
                ancestors.push(group.parent)
            }
        }

        setAllGroups([...fieldsGroups, ...ancestors])
    }, [fields])

    return (
        <Fragment>
             {allGroups.map(group => 
                !group.parent && 
                <div key={group._id}>
                    <span className="top-group-name">
                        {group.name}
                    </span>
                    <GroupsList 
                    groups={allGroups.filter(thisGroup => 
                        thisGroup.parent?._id === group._id)}
                    fields={fields} /> 
                </div>)}
        </Fragment>
    )
}

export default ParentGroups
