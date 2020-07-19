import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import DropdownMenu from '../../common/DropdownMenu';
import { editPath, deletePath } from '../../../redux/actions/paths';
import VerifyDelete from '../../common/VerifyDelete';


function PathItem(props) {
    const dispatch = useDispatch();
    const [path, setPath] = useState(props.path);
    const [tempPath, setTempPath] = useState(path.name); // Used to save current path in case the user regrets editing
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
        setPath({...path, name: tempPath});
    }

    const openVerifyDelete = () => {
        setShowMenu(false)
        setShowVerifyDelete(true);
    }

    const handleKeyPress = e => {
        // Update path
        if(e.key === "Enter" && path.name !== "") {
            // Compose object 
            const data = {
                name: path.name
            }

            dispatch(editPath(path._id, data));
            setTempPath(path.name) // TODO: only if not error
            // Exit edit mode 
            setEditMode(false);
        }
    }

    if(!editMode) {
        return (
            <li onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
               <span>{path.name} </span>
               {showIcon && (
                    <i 
                    className="material-icons more-list"
                    onClick={() => setShowMenu(!showMenu)}
                    >more_vert</i>
               )}

                <DropdownMenu show={showMenu} setShow={setShowMenu}>
                       <li onClick={enterEditMode}>ערוך מסלול</li>
                       <li onClick={openVerifyDelete}>מחק מסלול</li>
                </DropdownMenu>
                <VerifyDelete 
                display={showVerifyDelete} 
                setDisplay={setShowVerifyDelete}
                callback={deletePath}
                values={[path._id]}
                />
            </li>
        )
    }

    else {
        return(
            <li>
                <input 
                type="text"
                value={path.name}
                onChange={e => setPath({...path, name: e.target.value})}
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

export default PathItem
