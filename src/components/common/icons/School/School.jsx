import React from 'react'
import defaults from '../defaults';

function School({ color, outlined, width, height }) {
    const style = {
        strokeMiterlimit: "10",
        fill: outlined 
        ? "none"
        : color || defaults.color,
        strokeWidth: "15px",
        stroke: color || defaults.color,
    }

    const styleCls2 = {
        stroke: color,
        fill: color 
    }

    const styleCls3 = {
        fill: "none",
    }

    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 551.69 350.61">
            <g {...style} id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                        <path className="cls-1" d="M432.41,160.88V318.5a392.54,392.54,0,0,1-135.87,27,395,395,0,0,1-152.66-27V159.72L289.49,223.2Z"/>
                        <polygon className="cls-1" points="539.18 114.34 432.41 160.88 289.49 223.2 143.88 159.72 39.8 114.34 289.49 5.46 539.18 114.34"/>
                        <path {...styleCls3} className="cls-3" d="M39.8,115c-28.18,6.44-34.4,77.78-18.32,157.82"/>
                        <path {...styleCls2} className="cls-2" d="M34,261.88l7.41,46.86-17.27-17L12.59,313.9,5.08,266.48a7,7,0,0,1,5.87-8H11l15-2.37A7,7,0,0,1,34,261.88Z"/>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default School
