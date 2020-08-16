import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from '../../common/DropdownMenu';

function SubpageItem({ subpage }) {
    const [displaySection, setDisplaySection] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleAdd = open => {
        setDisplayAdd(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "הוסף נושא",
            action: () => toggleAdd(true)
        },
        {
            name: "ערוך דף",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק דף",
            action: () => toggleVer(true)
        }
    ]
    
    return (
        <div>
            <div className="section-header">
                <span 
                className="section-title"
                onClick={() => setDisplaySection(!displaySection)}>
                    {subpage.name}
                </span>
                <div className="subpage-menu">
                    <i className="material-icons"
                    onClick={() => toggleMenu(!displayMenu)}>more_vert</i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </div>
            </div>
            <div className={displayMenu
                ? "section-content open" 
                : "section-content"}>
                <div className="section-content-holder">
                </div>
            </div>
        </div>
    )
}

SubpageItem.propTypes = {
    subpage: PropTypes.object.isRequired
}

export default SubpageItem
