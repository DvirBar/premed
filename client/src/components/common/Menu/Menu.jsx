import React, { memo, useRef } from 'react'

const Menu = ({ display, children })  => {
    const ref = useRef()

    // useScreenAware(ref, display)
    return (
        <div 
        ref={ref}
        className={`menu-wrapper ${display ? 'display' : ''}`}>
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
