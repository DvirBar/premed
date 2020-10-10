import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DropdownMenu from '../../common/DropdownMenu';
import { editGroup, deleteGroup } from '../../../redux/actions/ancgroups';
import VerifyDelete from '../../common/VerifyDelete';

function GroupItem({ propgroup, pathId }) {
    const dispatch = useDispatch();
    const [group, setGroup] = useState(propgroup)
    // Used to save current group in case the user regrets editing
    const [tempGroup, setTempGroup] = useState(); 
    const [displayMenu, setDisplayMenu] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setGroup(propgroup)
        setTempGroup(propgroup?.name)
    }, [propgroup])

    const handleKeyPress = e => {
        // Update group
        if(e.key === "Enter" && group.name !== "") {
            // Compose object 
            const data = {
                name: group.name,
                pathId: pathId
            }

            dispatch(editGroup(group._id, data));
            setTempGroup(group.name) // TODO: only if not error
            // Exit edit mode 
            setEditMode(false);
        }
    }

    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const toggleEditMode = toggle => {
        if(toggle) {
            setEditMode(true);
            setDisplayMenu(false);
        }

        else {
            setEditMode(false);
            setGroup({...group, name: tempGroup});
        }
    
    }

    const toggleDelete = toggle => {
        setShowDelete(toggle)
    }

    const options = [
        {
            name: "עריכת קבוצה",
            action: () => toggleEditMode(true)
        },
        {
            name: "מחיקת קבוצה",
            action: () => toggleDelete(true)
        }
    ]

    if(!editMode) {
        return (
            <li className="group-item">
               <span>{group.name}</span>
                <div className="inline-menu">
                    <i 
                    className="material-icons more-list"
                    onClick={() => toggleMenu(!displayMenu)}>
                        more_vert
                    </i>

                    <DropdownMenu 
                    display={displayMenu}
                    toggleMenu={toggleMenu} 
                    options={options} />
                </div>
                
                <VerifyDelete 
                display={showDelete} 
                toggleModal={toggleDelete}
                callback={deleteGroup}
                values={[group._id]} />
            </li>
        )
    }

    else {
        return(
            <li>
                <input 
                type="text"
                value={group.name}
                onChange={e => setGroup({...group, name: e.target.value})}
                onKeyPress={e => handleKeyPress(e)}
                />

                <span 
                className="exit-edit"
                onClick={() => toggleEditMode(false)}
                >&times;</span>
            </li>
        )
    }
}

GroupItem.propTypes = {
    name: PropTypes.string.isRequired,
    pathId: PropTypes.string.isRequired
}

export default GroupItem
