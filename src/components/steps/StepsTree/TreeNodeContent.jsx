import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getUniById } from '../../../redux/selectors/unis'
import { StepsContext } from '../StepsContext'

function TreeNodeContent({ step, color }) {
    const {
        selectStep
    } = useContext(StepsContext)

    const nodeStyle = {
        borderColor: color,
        color
    }

    const indicatorStyle = {
        backgroundImage: `linear-gradient(${color}, ${color})`
    }
    
    const uniData = step.uniData[0]
    const isFinal = step.uniData.length === 1 && uniData.isFinal

    const uniName = useSelector(getUniById(uniData.uni))?.name

    return (
        <div
        style={nodeStyle}
        onClick={e => selectStep(e, step, isFinal)}
        className="tree-node-content">
            <div 
            style={indicatorStyle}
            className="node-indicator">
            </div>
            <div className="node-step-details">
                <p className="node-step-name">
                    {step.name}
                </p>
                {isFinal &&
                    <p className="node-step-uni">
                        {uniName}
                    </p>
                }
            </div>
        </div>
    )
}

export default TreeNodeContent
