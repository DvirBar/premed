import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selTableSelector } from '../../../../../redux/selectors/userdata';
import FormInput from '../../../../common/FormInput';
import { GroupsContext } from '../GroupsContext';


function AddCustomGroup({ 
    changeDisplay, 
    displayCustom,
    selMultiGroup 
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
        changeDisplay(false)
    }

    return (
        <div className={`add-custom-group 
        ${displayCustom ? 'display' : ''}`}>
            <FormInput
            label="מקצוע אחר"
            type="text"
            name="name"
            value={groupName}
            onEnter={addGroup}
            limit='30'
            onChange={e => setGroupName(e.target.value)} />
        </div>
    )
}

export default AddCustomGroup
