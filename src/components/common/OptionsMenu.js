import React, { useRef } from 'react'
import DropdownMenu from './DropdownMenu'
import useOnClickOutside from './useOnClickOutside'

function OptionsMenu({ displayMenu, toggleMenu, options }) {
    const ref = useRef()
    useOnClickOutside(ref, displayMenu, () => toggleMenu(false))

    return (
        <div 
        className="inline-menu" ref={ref}>
            <i 
            className="material-icons" 
            onClick={() => toggleMenu(!displayMenu)}>
                more_vert
            </i>
            <DropdownMenu
            display={displayMenu}
            toggleMenu={toggleMenu}
            options={options} />
        </div>
    )
}

export default OptionsMenu
