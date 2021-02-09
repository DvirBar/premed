import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getUniById } from '../../../redux/selectors/unis'
import { StepsContext } from '../StepsContext'

function TreeNodeContent({ step, color }) {
    const noMargin = {
        margin: 0
    }

    const {
        selectStep
    } = useContext(StepsContext)

    const circleStyle = {
        stroke: color
    }
    
    const uniData = step.uniData[0]
    const isFinal = step.uniData.length === 1 && uniData.isFinal

    const uniName = useSelector(getUniById(uniData.uni))?.name

    return (
        <svg 
        onClick={e => selectStep(e, step, isFinal)}
        width="100" height={`${isFinal ? '80' : '55'}`}
        className="tree-node" style={noMargin}
        xmlns="http://www.w3.org/2000/svg">
            <circle 
            className="node-circle"
            cx="50" cy="15" r="10" 
            style={circleStyle}
            stroke={color} 
            fill="transparent" />

            <text 
            className="step-name"
            textAnchor="middle"
            fontSize="18"
            stroke={color}
            x="50" y="45">{step.name}</text>

            {isFinal &&
                <text 
                className="step-name"
                textAnchor="middle"
                fontSize="14"
                stroke={color}
                x="50" y="65">
                    {uniName}
                </text>
            }
        </svg>
    )
}

export default TreeNodeContent
