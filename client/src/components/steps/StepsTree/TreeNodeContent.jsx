import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getUniById } from '../../../redux/selectors/unis'
import useWindowDim from '../../common/useWindowDim'
import { StepsContext } from '../StepsContext'
import { LinkContext } from './TreeLink/LinkContext'

function TreeNodeContent({ step, color, isMulti }) {
    const {
        selectStep,
        isFinal
    } = useContext(StepsContext)

    const nodeStyle = {
        borderColor: color,
        color
    }

    const indicatorStyle = {
        backgroundImage: `linear-gradient(${color}, ${color})`
    }

    const uniData = step.uniData[0]
    
    const uniName = useSelector(getUniById(uniData.uni))?.name
    const isStepFinal = isFinal(step)
    
    return (
        <div
        style={nodeStyle}
        onClick={e => selectStep(e, step)}
        className="tree-node-content">
            <div 
            style={indicatorStyle}
            className="node-indicator">
            </div>
            <div className="node-step-details">
                <p className="node-step-name">
                    {step.name}
                </p>
                {isStepFinal &&
                    <p className="node-step-uni">
                        {uniName}
                    </p>
                }
            </div>
        </div>
    )
}

export default TreeNodeContent
