import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import TreeNodeContent from './TreeNodeContent';
import { useSelector } from 'react-redux';
import StepsGroup from './StepsGroup';
import TreeLink from './TreeLink/TreeLink';
import StepsLevel from './StepsLevel';
import { getNextSteps, getStepChildren } from '../../../redux/selectors/steps';
import { StepsContext } from '../StepsContext';
import useWindowDim from '../../common/useWindowDim';

function TreeNode({ step, length, duplicateParent }) { 
    const nextSteps = useSelector(getNextSteps(step?._id))
    const children = useSelector(getStepChildren(step?._id))
    const isTopLevel = !step.parent
    const isGroup = children.length > 0

    const isEven = length % 2 === 0
    const ratio = isEven 
    ? isGroup ? length : length + 1 
    : length

    const nodeWidth = {
        width: (100/ratio) + '%'}

    const {
        getTreeColor
    } = useContext(StepsContext)

    const color = getTreeColor(step.uniData)
    const {
        width: windowWidth
    } = useWindowDim()

    const levelWidth = (windowWidth <= 650) ? 150 : 300

    const width = nextSteps.length === 0 ? levelWidth : '100%'

    const ref = useRef()

    const [divWidth, setDivWidth] = useState(0)

    useEffect(() => {
        setDivWidth(ref.current?.offsetWidth)
    }, [ref.current, windowWidth, length])

    const nodeX = nextSteps.length % 2 === 0  
        ?   divWidth/(nextSteps.length + 1)
        :   divWidth/nextSteps.length
    
    return (
        <div
        ref={ref}
        style={nodeWidth} 
        className="tree-node">
            {isGroup 
            ?   <StepsGroup
                parent={step}
                length={length}
                color={color}
                isTopLevel={isTopLevel} />
            :   <TreeNodeContent
                duplicateParent={duplicateParent}
                color={color}
                step={step} />
            }
            {nextSteps?.length > 0 && 
                <Fragment>
                    <TreeLink
                    nodeX={nodeX}
                    linkWidth={divWidth}
                    linkInfo={step.linkInfo}
                    nextSteps={nextSteps}
                    color={color} />
                    <StepsLevel
                    width={width}
                    nextSteps={nextSteps} />
                </Fragment>
            }
        </div>
    )
}

export default TreeNode
