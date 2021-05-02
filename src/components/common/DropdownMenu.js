import React from 'react';

function DropdownMenu({ display, toggleMenu, options}) {

    const clickItem = callback => {
        toggleMenu(false)
        callback()
    }

    return (
        <ul className={display
            ? "dropdown-menu open"
            : "dropdown-menu"}>
            {options.map(option => 
                <li onClick={() => clickItem(option.action)}>
                    {option.name}
                </li>
            )}
        </ul>
    )
}

export default DropdownMenu;