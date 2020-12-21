import React from 'react'
import { useSelector } from 'react-redux'
import { getUnisByInputs } from '../../../../redux/selectors/unis'
import GroupsProvider from '../data-block/GroupsContext'
import DataBlock from '../DataBlock'

function ArgsBlock({ fields, groups, calcs, changeStartSimulate }) {
    const unis = useSelector(getUnisByInputs(fields, groups, calcs))

    const getChildren = group => {
        return groups.filter(thisGroup => 
            thisGroup.parent === group._id)
    }

   
    return (
        <GroupsProvider isSimulated={true}>
            <div className="args-fields-block">
                <div className="no-uni-section">
                    <div className="no-groups">
                        <DataBlock 
                        fields={fields}
                        calcs={calcs} />   
                    </div>

                    {groups &&
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
                <button onClick={() => changeStartSimulate(true)}>
                    חישוב
                </button>
            </div>
        </GroupsProvider>
    )
}

export default ArgsBlock
