import React, { useRef } from 'react'
import useHideScroll from '../../common/hooks/useHideScroll'
import useOnClickOutside from '../../common/useOnClickOutside'

function SideMenu({ display, setDisplay, children }) {
    const ref = useRef()
    useOnClickOutside(ref, display, () => setDisplay(false))
    useHideScroll(display)
    return (
        <div className={`side-menu
        ${display ? 'display' : ''}`}>
            <div className="side-menu__mask"></div>
            <div 
            ref={ref}
            className="side-menu__container">
                <div className="side-menu__container__content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SideMenu
