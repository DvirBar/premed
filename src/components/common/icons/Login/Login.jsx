import React from 'react'
import defaults from '../defaults'

function Login({
    color, 
    width, 
    height,
    className
}) {
    const style ={
        fill:"none",
        stroke: color || defaults.color,
        strokeMiterlimit: "10",
        strokeWidth:"10px"
    }

    return (
        <svg 
        className={className}
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.51 230.94">
            <g
            {...style}
            id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path className="cls-1" d="M102.45,225.94h91a9,9,0,0,0,9-9V14a9,9,0,0,0-9-9H101.41"/>
                    <path className="cls-1" d="M90.7,148.25l49.39-28.52a9.2,9.2,0,0,0,0-15.94L90.7,75.27"/>
                    <line className="cls-1" x1="108.98" y1="110.66" y2="110.66"/>
                </g>
            </g>
        </svg>
    )
}

export default Login
