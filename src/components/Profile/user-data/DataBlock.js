import React, { useContext } from 'react';
import CustomGroup from './data-block/CustomGroup';
import FormFragment from './data-block/FormFragment';
import { GroupsContext } from './data-block/GroupsContext';
import GroupsList from './data-block/GroupsList';
import OptionalGroup from './data-block/OptionalGroup';
import StagedGroups from './data-block/StagedGroups';
import useSortGroups from './data-block/useSortGroups';

function DataBlock({ 
    title, 
    fields, 
    groups, 
    group, 
    calcs, 
    getChildren
}) {
    const {
        customGroups,
        stagedGroupsList,
        isSimulated
    } = useContext(GroupsContext)

    const {
        reqGroups,
        optGroups,
        unUsedGroups
    } = useSortGroups(group, groups, stagedGroupsList)

    return (
        <div className={isSimulated
        ?   "data-block simulated"
        :   "data-block not-simulated"}>
            {title &&
                <div className="block-header">
                    {title}
                </div>
            }
            <div className="data-block-content">
                <div className="data-block-fragment">
                    {calcs?.map(calc =>
                        <FormFragment
                        key={calc._id}
                        field={calc}
                        isCalc={true} />
                    )}
                </div>
                
                <div className="data-block-fragment">
                    {fields?.map(field => 
                        (!field.isType || !isSimulated) &&
                        <FormFragment
                        key={field._id}
                        field={field}
                        group={group}
                        isCalc={false} />
                    )}
                </div>
                
                {groups && groups.length > 0 && 
                <div className="groups-block">
                    {reqGroups?.map(group => 
                        <GroupsList
                        group={group}
                        groups={getChildren(group)}
                        getChildren={getChildren} />
                    )}

                    {optGroups?.map(group =>
                        <OptionalGroup
                        group={group}
                        groups={getChildren(group)}
                        getChildren={getChildren} />
                    )}

                    {customGroups?.map(group =>
                        <CustomGroup
                        customGroup={group}
                        groups={groups} />
                    )}

                    <StagedGroups 
                    groups={unUsedGroups}
                    getChildren={getChildren} />
                </div>
                }
            </div>
        </div>
    )
}

export default DataBlock
