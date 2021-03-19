import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import TreeNodeContent from './TreeNodeContent';
import { useSelector } from 'react-redux';
import StepsGroup from './StepsGroup';
import TreeLink from './TreeLink/TreeLink';
import StepsLevel from './StepsLevel';
import LinkLabel from './TreeLink/LinkLabel';
import { getNextSteps, getStepChildren } from '../../../redux/selectors/steps';
import { StepsContext } from '../StepsContext';
import { useLocation, useRouteMatch } from 'react-router';

function TreeNode({ step, length }) {
    const location = useLocation()
    const { url } = useRouteMatch()

    console.log(location);
    console.log(url);
 
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

    return (
        <div
        style={nodeWidth} 
        className="tree-node">
            {isGroup 
            ?   <StepsGroup
                parent={step}
                color={color}
                isTopLevel={isTopLevel} />
            :   <TreeNodeContent
                color={color}
                step={step} />
            }
            {nextSteps?.length > 0 && 
                <Fragment>
                    <TreeLink
                    linkWidth='300'
                    linkInfo={step.linkInfo}
                    nextSteps={nextSteps}
                    color={color} />
                    <StepsLevel
                    levelWidth='300px'
                    nextSteps={nextSteps} />
                </Fragment>
            }
        </div>
    )
}

export default TreeNode
