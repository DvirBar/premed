import React from 'react'

function TreeNodeContent({ step }) {
    const noMargin = {
        margin: 0
    }

    return (
        <svg width="100" height="55"
        className="tree-node" style={noMargin}
        xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="15" r="10" stroke="purple" strokeWidth="2" fill="transparent" />
            <text 
            textAnchor="middle"
            fontSize="18"
            x="50" y="45">{step.name}</text>
        </svg>
    )
}

export default TreeNodeContent
