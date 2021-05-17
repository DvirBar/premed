import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addSimulatedGroup, 
    insertDataSimulation, 
    removeSimulatedGroup, 
    removeSimulatedValues, 
    validErrorSimulated } from '../../../../redux/actions/userdata';
import { v4 as uuidv4 } from 'uuid'
import { 
    getCustomGroupsSimulated, 
    getFieldValSimulated, 
    getGroupsValsSimulated, 
    getGroupValsSimulated, 
    getSimErrorByCalc, 
    getSimulatedVals, 
    getSimValidErrors } from '../../../../redux/selectors/userdata';


import {
    selectSimCustomGroup,
    selectSimFieldValue,
    selectSimFieldValues
}  from '../../../../redux/stats/userdata/simulated-data/selectors';

const useSimulatedData = () => {
    const dispatch = useDispatch()
    const simulatedVals= useSelector(getSimulatedVals)

    const newCustomGroup = useCallback(dataObj => {
        const newGroup = {
            _id: uuidv4(),
            name: dataObj.name,
            cusGroupParent: dataObj.group
        }

        dispatch(addSimulatedGroup(newGroup))
    }, [])

    const commitOnChange = useCallback(dataObj => {
        const {
            fieldId,
            groupId,
            cusGroupParent,
            value 
        } = dataObj

        dispatch(insertDataSimulation(fieldId, groupId, cusGroupParent, value))
    }, [])

    const execRemoveVals = (data, isStaged) => {
        const _id = data.groupId || data.fieldId         
        const isGroup = data.groupId !== undefined
        const hasData = simulatedVals.find(val => val.group === data.groupId)
    
        if(!isStaged || hasData)
            dispatch(removeSimulatedValues(_id, isGroup))

        if(isGroup)
            dispatch(removeSimulatedGroup(data.groupId))

        removeStagedGroup(data.groupId)
    }

    const removeStagedGroup = groupId => {
        setStagedGroupsList(stagedGroupsList.filter(stagedGroup =>
            stagedGroup._id !== groupId))
    }

    const [stagedGroupsList, setStagedGroupsList] = useState([])

    const addStagedGroup = group => {
        setStagedGroupsList([...stagedGroupsList, group])
    }

    const customGroups = useSelector(getCustomGroupsSimulated)

    return {
        newCustomGroup,
        commitOnChange,
        execRemoveVals,
        removeStagedGroup,
        addStagedGroup,
        stagedGroupsList,
        customGroups,
        getFieldVal: getFieldValSimulated,
        getGroupVals: getGroupValsSimulated,
        getGroupsVals: getGroupsValsSimulated,
        validError: validErrorSimulated,
        getValidErrors: getSimValidErrors,
        getErrorByCalc: getSimErrorByCalc,
        selectFieldValues: selectSimFieldValues,
        selectFieldValue: selectSimFieldValue,
        selectCustomGroup: selectSimCustomGroup,
        isSimulated: true
    }

}

export default useSimulatedData