import React, { memo } from 'react'

const Menu = ({ display, children })  => {
    // Close when clicking outside the list
    return (
        <div className={`menu-wrapper ${display ? 'display' : ''}`}>
            <ul 
            className={`dd-menu noselect`}>
                {children.map((child, index) => 
                    <li 
                    key={index}
                    className="dd-menu__item"> 
                        {child}
                    </li>    
                )}
            </ul>
        </div>
        
    )
}

export default memo(Menu)
