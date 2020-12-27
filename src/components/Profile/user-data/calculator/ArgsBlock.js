import React from 'react'
import DataBlock from '../DataBlock'

function ArgsBlock({ 
    fields, 
    groups, 
    calcs, 
    unis }) {

    const getChildren = group => {
        return groups.filter(thisGroup => 
            thisGroup.parent === group._id)
    }
   
    return (
        <div className="args-fields-block">
            <div className="no-uni-section">
                <div className="no-groups">
                    <DataBlock 
                    fields={fields}
                    calcs={calcs} />   
                </div>

                {groups.length > 0 &&
                groups.map(group => 
                    !group.parent && 
                        <DataBlock
                        key={group._id}
                        title={group.name}
                        fields={group.fields}
                        calcs={calcs}
                        group={group}
                        groups={getChildren(group)}
                        getChildren={getChildren} />
                    )
                }
            </div>

            {unis.map(uni => 
                <div 
                key={uni._id}
                className="fields-list">
                    
                </div>
            )}
            
        </div>
    )
}

export default ArgsBlock
