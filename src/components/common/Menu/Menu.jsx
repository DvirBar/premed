import React, { memo, useRef } from 'react'
import useOnClickOutside from '../useOnClickOutside'
import useLongTouch from '../hooks/useLongTouch'

const Menu = ({ display, toggleDisplay, children, longTouchRef }) => {
    // Close when clicking outside the list
    const ref =  useRef()
    useOnClickOutside(ref, display, () => toggleDisplay(false))

    // Mobile: Open on long touch
    useLongTouch(longTouchRef, () => toggleDisplay(true))

    return (
        <ul 
        ref={ref} 
        className={`menu ${display ? 'display' : ''} noselect`}>
            {children.map((child, index) => 
                <li 
                key={index}
                className="menu__item"> 
                    {child}
                </li>    
            )}
        </ul>
    )
}

export default memo(Menu)
