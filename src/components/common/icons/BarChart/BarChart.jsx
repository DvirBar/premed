import React from 'react'
import defaults from '../defaults'

function BarChart({ 
    width,
    height,
    color, 
    outlined }) {
    const style = {
        fill: outlined 
        ? "none"
        :  color || defaults.color,
        stroke: color || defaults.color,
        strokeMiterlimit:"10",
        strokeWidth: "10px",
    }

    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246.65 350.16">
            <g 
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                        <rect class="cls-1" x="5" y="76.32" width="63.91" height="268.84"/>
                        <rect class="cls-1" x="177.74" y="5" width="63.91" height="340.16"/>
                        <rect class="cls-1" x="91.37" y="160.37" width="63.91" height="184.78"/>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default BarChart
