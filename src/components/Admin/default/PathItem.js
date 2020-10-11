import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DropdownMenu from '../../common/DropdownMenu';
import { editPath, deletePath } from '../../../redux/actions/paths';
import VerifyDelete from '../../common/VerifyDelete';


function PathItem({ path }) {
    const dispatch = useDispatch();
    const [tempPath, setTempPath] = useState(path); // Used to save current path in case the user regrets editing
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [editMode, setEditMode] = useState(false);

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
            setTempPath(path);
        }
    }

    const toggleDelete = toggle => {
        setDisplayDelete(toggle)
    }

    const handleKeyPress = e => {
        // Update path
        if(e.key === "Enter" && tempPath.name !== "") {
            // Compose object 
            const data = {
                name: tempPath.name
            }

            dispatch(editPath(path._id, data)); // TODO: only if not error
            // Exit edit mode 
            setEditMode(false);
        }
    }

    const options = [
        {
            name: "עריכה",
            action: () => toggleEditMode(true)
        },
        {
            name: "מחיקה",
            action: () => toggleDelete(true)
        }
    ]

    useEffect(() => {
        console.log(editMode);
    }, [editMode])

    if(!editMode) {
        return (
            <li className="path-item">
               <span>{path.name}</span>
                <div className="inline-menu">
                    <i className="material-icons"
                    onClick={() => setDisplayMenu(!displayMenu)}>more_vert</i>
                    <DropdownMenu 
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </div>
                <VerifyDelete 
                display={displayDelete} 
                toggleModal={toggleDelete}
                callback={deletePath}
                values={[path._id]} />
            </li>
        )
    }

    else {
        return(
            <li>
                <input 
                type="text"
                value={path.name}
                onChange={e => setTempPath({...path, name: e.target.value})}
                onKeyPress={e => handleKeyPress(e)} />

                <span 
                className="exit-edit"
                onClick={toggleEditMode(false)}>&times;</span>
            </li>
        )
    }
}

export default PathItem
