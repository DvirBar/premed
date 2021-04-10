import React from 'react'
import defaults from '../defaults'

function Profile({ 
    color,
    outlined,
    width, 
    height
}) {
    const style = {
        fill: outlined 
        ? "none"
        : color || defaults.color,
        stroke: color || defaults.color,
        strokeMiterlimit: "10",
        strokeWidth: "10px"
    }

    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 213.36 350.16">
            <g 
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path class="cls-1" d="M59.47,164.33h94.42a54.47,54.47,0,0,1,54.47,54.47h0V339.35a5.81,5.81,0,0,1-5.81,5.81H10.8A5.81,5.81,0,0,1,5,339.35H5V218.8a54.47,54.47,0,0,1,54.47-54.47Z"/>
                    <circle class="cls-1" cx="106.68" cy="74.72" r="69.72"/>
                </g>
            </g>
        </svg>
    )
}

export default Profile
