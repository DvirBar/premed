import React, { useEffect, useState } from 'react';

function TopLinks({ className, children, selectLink, selected }) {
    return (
        <ul className={className 
        ?   `top-links ${className}`
        :   "top-links"}>
            {children.map(child => 
                <li
                key={child.props.id}
                className={child.props.id === selected
                ? "link-item current"
                : "link-item"}>
                    <span>
                        <span 
                        className="span-hover"
                        onClick={() => selectLink(child.props.id)}>
                            {child}
                        </span>
                    </span>
                </li>
            )}
        </ul>
    )
}



export default TopLinks
