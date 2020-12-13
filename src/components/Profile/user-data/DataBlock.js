import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCustomGroups, getGroupsVals } from '../../../redux/selectors/userdata';
import CustomGroup from './data-block/CustomGroup';
import FormFragment from './data-block/FormFragment';
import GroupsList from './data-block/GroupsList';
import OptionalGroup from './data-block/OptionalGroup';
import StagedGroups from './data-block/StagedGroups';

function DataBlock({ title, fields, groups, calcs, getChildren }) {
    let reqGroups = []
    let optGroups = []
    let unUsedGroups = []
    const [stagedGroupsList, setStagedGroupsList] = useState([])

    const addStagedGroup = group => {
        setStagedGroupsList([...stagedGroupsList, group])
    }

    const removeStagedGroup = groupId => {
        setStagedGroupsList(stagedGroupsList.filter(stagedGroup =>
            stagedGroup._id !== groupId))
    }

    const groupsVals = useSelector(getGroupsVals)
    const customGroups = useSelector(getCustomGroups)
    
    if(groups) {
        for(let group of groups) {
            const config = group.config?.uniqueGroupType
            ?   group.config['jew']
            :   group.config

            if(config && !config.isOptional) {
                reqGroups.push(group)
            }
    
            else {
                const groupVal = groupsVals.find(val => 
                    val.group === group._id)
                
                const isStaged = stagedGroupsList.find(stagedGroup =>
                    stagedGroup._id === group._id)
                if(groupVal && !group.multiVals && !isStaged) {
                    optGroups.push(group)
                }

                else {
                    unUsedGroups.push(group)
                }
            }
        }
    }

    return (
        <div className="data-block">
            <div className="block-header">
                {title}
            </div>
            <div className="data-block-content">
                {fields?.map(field => 
                    <FormFragment
                    key={field._id}
                    field={field}
                    isCalc={false} />
                )}

                {calcs?.map(calc =>
                    <FormFragment
                    key={calc._id}
                    field={calc}
                    isCalc={true} />
                )}

                {groups && groups.length !== 0 && 
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
                    addStagedGroup={addStagedGroup}
                    removeStagedGroup={removeStagedGroup}
                    stagedGroupsList={stagedGroupsList}
                    groups={unUsedGroups}
                    getChildren={getChildren} />
                </div>
                }
            </div>
        </div>
    )
}

export default DataBlock
