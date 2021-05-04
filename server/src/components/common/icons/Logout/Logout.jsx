import React from 'react'
import defaults from '../defaults'

function Logout({
    color, 
    width, 
    height
}) {
    const style = { 
        fill:"none", 
        stroke: color || defaults.color,
        strokeMiterlimit:"10",
        strokeWidth:"10px"
    }

    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 212.51 230.94">
            <g 
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path className="cls-1" d="M107.45,225.94h91a9,9,0,0,0,9-9V14a9,9,0,0,0-9-9H106.41"/>
                    <path className="cls-1" d="M59,75.27,9.6,103.79a9.21,9.21,0,0,0,0,15.94L59,148.25"/>
                    <line className="cls-1" x1="40.72" y1="112.86" x2="149.69" y2="112.86"/>
                </g>
            </g>
        </svg>
    )
}

export default Logout
