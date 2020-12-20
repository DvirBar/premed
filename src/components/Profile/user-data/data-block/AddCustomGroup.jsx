import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomGroup } from '../../../../redux/actions/userdata';
import { selTableSelector } from '../../../../redux/selectors/userdata';
import FormInput from '../../../common/FormInput';
import { GroupsContext } from './GroupsContext';


function AddCustomGroup({ 
    changeStatus, 
    statuses, 
    selMultiGroup, 
     }) {
    const [groupName, setGroupName] = useState('')
    const selTable = useSelector(selTableSelector)
    const {
        newCustomGroup
    } = useContext(GroupsContext)

    const addGroup = () => {
        const dataObj = {
            name: groupName,
            group: selMultiGroup
        }

        newCustomGroup(dataObj, selTable)
        changeStatus(statuses.addButton)
    }

    return (
        <FormInput
        label="מקצוע אחר"
        type="text"
        name="name"
        value={groupName}
        onEnter={addGroup}
        limit='30'
        onChange={e => setGroupName(e.target.value)} />
    )
}

export default AddCustomGroup
