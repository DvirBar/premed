import React from 'react'
import defaults from '../defaults'

function Home({ 
    color, 
    outlined, 
    width, 
    height }) {

    const style = {
        fill: outlined
        ?   "none"
        :   color || defaults.color,
        stroke: color || defaults.color,
        strokeMiterlimit: "10",
        strokeWidth: "10px"
    }

    return (
        <svg 
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 408.28 351.4">
            <g 
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g id="Layer_1-2-2" data-name="Layer 1-2">
                        <polygon class="cls-1" points="242.69 346.16 242.69 223.18 166.07 223.18 166.07 346.16 80.67 346.16 80.67 147.53 15.76 147.53 204.14 6.55 392.52 147.53 327.61 147.53 327.61 346.16 242.69 346.16"/>
                        <path class="cls-1" d="M204.14,6.86,391.79,147.29H327.37V345.91H242.94v-123H165.83v123H80.91V147.29H16.49L204.14,6.86m0-.61L15,147.77H80.42V346.4h85.9v-123h76.13v123h85.4V147.77h65.4Z"/>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default Home
