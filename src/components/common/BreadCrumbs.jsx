import React, { Fragment, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

function BreadCrumbs({ children, highlightIndex }) {
    // The default index to highlight is the last one
    const lightenIndex = highlightIndex || children.length - 1
    const location = useLocation()
    
    // Scroll to the end on load
    const ref = useRef()
    // useEffect(() => {
    //     ref.current.scrollLeft = -ref.current.scrollWidth
    // }, [location])

    return (
        <ul 
        className="bread-crumbs">
            {children.map((child, index) =>
                <Fragment>
                    <li 
                    className={`bread-crumbs__item
                    ${lightenIndex === index ? 'highlight' : ''}`}>
                        <div>
                            {child}
                        </div>
                    </li>
                </Fragment> 
                  
            )}
        </ul>
    )
}

export default BreadCrumbs
