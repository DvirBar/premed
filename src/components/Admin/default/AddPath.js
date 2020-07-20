import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPath } from '../../../redux/actions/paths'; 

function AddPath() {
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    const [path, setPath] = useState("");

    const showTextbox = () => {
        setDisplay(true);
    }

    const createPath = event => {
        if(event.key === "Enter") {
            if(path !== "") {
                // Compose object 
                const data = {
                    name: path
                }

                dispatch(addPath(data));
                // Clear input and hide field
                setPath("")
                setDisplay(false) 
            }
        }
    }

    const exitAdd = () => {
        setPath("");
        setDisplay(false);
    }

    return (
        <Fragment>
            {display &&
                <li className="add-path-input">
                    <input 
                    type="text"
                    placeholder="מסלול חדש..."
                    id="path-input" 
                    name="path_input"
                    value={path}
                    onChange={e => setPath(e.target.value)}
                    onKeyPress={e => createPath(e)} />
                    <span 
                    className="exit-edit"
                    onClick={exitAdd}
                    >&times;</span>
                </li>}
            <li className="add-path" onClick={showTextbox}>+</li>
        </Fragment>
    )
}

export default AddPath;
