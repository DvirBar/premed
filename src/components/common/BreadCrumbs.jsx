import React, { Fragment } from 'react'


function BreadCrumbs({ children, highlightIndex }) {
    // The default index to highlight is the last one
    const lightenIndex = highlightIndex || children.length - 1
    
    // // Scroll to the end on load
    // const ref = useRef()
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
