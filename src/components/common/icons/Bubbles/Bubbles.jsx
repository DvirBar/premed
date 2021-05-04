import React from 'react'
import defaults from '../defaults';

function Bubbles({ color, outlined, width, height }) {
    const style = {
        fill: outlined 
        ? "none"
        : color || defaults.color,
        stroke: color || defaults.color, 
        strokeMiterlimit: 10,
        strokeWidth: "10px"
    }
    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265.36 350.16">
            <g 
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                        <circle className="cls-1" cx="112.67" cy="77.08" r="72.08"/>
                        <circle className="cls-1" cx="207.31" cy="209.5" r="53.05"/>
                        <circle className="cls-1" cx="68.35" cy="281.81" r="63.35"/>
                    </g>
                </g>
            </g>
        </svg>
)
}

export default Bubbles
