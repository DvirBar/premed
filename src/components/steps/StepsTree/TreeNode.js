import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TreeNodeContent from './TreeNodeContent';
import { useSelector } from 'react-redux';
import { getNextSteps, getStepChildren } from '../../../redux/selectors/steps';
import StepsGroup from './StepsGroup';
import TreeLink from './TreeLink/TreeLink';
import StepsLevel from './StepsLevel';
import LinkLabel from './TreeLink/LinkLabel';

function TreeNode({ step, length }) {
    const nextSteps = useSelector(getNextSteps(step._id))
    const children = useSelector(getStepChildren(step._id))

    const isGroup = children.length > 0
    const nodeWidth = {
        width: (100/length) + '%'}

    return (
        <div
        style={nodeWidth} 
        className="tree-node">
            {isGroup 
            ?   <StepsGroup
                parent={step} />
            :   <TreeNodeContent
                step={step} />
            }

            {nextSteps?.length > 0 &&
                <Fragment>
                    <LinkLabel
                    step={step}/>                       
                    <TreeLink
                    linkWidth='300'
                    linkInfo={step.linkInfo}
                    nextSteps={nextSteps} />
                    <StepsLevel
                    levelWidth='300px'
                    nextSteps={nextSteps} />
                </Fragment>
            }
        </div>
    )
}

export default TreeNode
