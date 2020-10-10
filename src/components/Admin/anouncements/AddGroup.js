import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addGroup } from '../../../redux/actions/ancgroups'; 

function AddGroup({ pathId, toggleDisplay }) {
    const dispatch = useDispatch();
    const [group, setGroup] = useState("");

    const createGroup = event => {
        if(event.key === "Enter") {
            if(group !== "") {
                // Compose object 
                const data = {
                    name: group,
                    pathId: pathId 
                }

                dispatch(addGroup(data));
                // Clear input and hide field
                setGroup("")
                toggleDisplay(false) 
            }
        }
    }

    const exitAdd = () => {
        setGroup("");
        toggleDisplay(false);
    }
    
    return (
        <li className="add-group-input">
            <input 
            type="text"
            placeholder="קבוצה חדשה"
            id="group-input" 
            name="group_input"
            value={group}
            onChange={e => setGroup(e.target.value)}
            onKeyPress={e => createGroup(e)} />
            <span 
            className="exit-edit"
            onClick={exitAdd}>
                &times;
            </span>
        </li>
    )
}

export default AddGroup
