import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DropdownMenu from '../../common/DropdownMenu';
import { editGroup, deleteGroup } from '../../../redux/actions/ancgroups';
import VerifyDelete from '../../common/VerifyDelete';

function GroupItem(props) {
    const dispatch = useDispatch();
    const [group, setGroup] = useState(props.group);
    const [tempGroup, setTempGroup] = useState(group.name); // Used to save current group in case the user regrets editing
    const [showIcon, setShowIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showVerifyDelete, setShowVerifyDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        setEditMode(true);
        setShowMenu(false);
    }

    const leaveEditMode = () => {
        setEditMode(false);
        setGroup({...group, name: tempGroup});
    }

    const openVerifyDelete = () => {
        setShowMenu(false)
        setShowVerifyDelete(true);
    }

    const handleKeyPress = e => {
        // Update group
        if(e.key === "Enter" && group.name !== "") {
            // Compose object 
            const data = {
                name: group.name,
                pathId: props.pathId
            }

            dispatch(editGroup(group._id, data));
            setTempGroup(group.name) // TODO: only if not error
            // Exit edit mode 
            setEditMode(false);
        }
    }

    if(!editMode) {
        return (
            <li onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
               <span>{group.name} </span>
               {showIcon && (
                    <i 
                    className="material-icons more-list"
                    onClick={() => setShowMenu(!showMenu)}
                    >more_vert</i>
               )}

                <DropdownMenu show={showMenu} setShow={setShowMenu}>
                    <li onClick={enterEditMode}>ערוך קבוצה</li>
                    <li onClick={openVerifyDelete}>מחק קבוצה</li>
                </DropdownMenu>
                <VerifyDelete 
                display={showVerifyDelete} 
                setDisplay={setShowVerifyDelete}
                callback={deleteGroup}
                values={[group._id]}
                />
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
                onClick={leaveEditMode}
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
