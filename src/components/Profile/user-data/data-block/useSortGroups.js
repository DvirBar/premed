import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSelTypes } from '../../../../redux/selectors/userdata'
import { GroupsContext } from './GroupsContext'

function useSortGroups(group, groups, stagedGroupsList) {
    const {
        getGroupsVals
    } = useContext(GroupsContext)
    const [reqGroups, setReqGroups] = useState([])
    const [optGroups, setOptGroups] = useState([])
    const [unUsedGroups, setUnUsedGroups] = useState([])
    const softLoading = useSelector(state => state.userdata.softLoading)
    
    const groupsVals = useSelector(getGroupsVals)
    const selTypes = useSelector(getSelTypes)
    const selType = selTypes.find(type => 
        type.group === group?._id)?.value
    
    useEffect(() => {
        if(groups && !softLoading) {
            let reqGroups = []
            let optGroups = []
            let unUsedGroups = []
            for(let group of groups) {
                const config = group.config?.uniqueGroupType
                ?   group.config[selType]
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
    
                    else if(!isStaged) {
                        unUsedGroups.push(group)
                    }
                }
            }

            setReqGroups(reqGroups)
            setOptGroups(optGroups)
            setUnUsedGroups(unUsedGroups)
        }
    }, [selType, groupsVals, stagedGroupsList])

    return {
        reqGroups,
        optGroups,
        unUsedGroups
    }
}

export default useSortGroups
