import React, { useEffect, useState } from 'react';

function TopLinks({
    className, 
    children, 
    selected, 
    onChoose }) {
        const commitOnChoose = loc => {
            if(onChoose) {
                onChoose(loc)
            }
        }

    return (
        <ul className={className 
        ?   `top-links ${className}`
        :   "top-links"}>
            {children.map(child => 
                <li
                onClick={() => commitOnChoose(child.props.id)}
                key={child.props.id}
                className={child.props.id === selected
                ? "link-item current"
                : "link-item"}>
                    <span>
                        <span 
                        className="span-hover">
                            {child}
                        </span>
                    </span>
                </li>
            )}
        </ul>
    )
}



export default TopLinks
