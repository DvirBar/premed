import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

function StepsTree({ steps }) {
    const parents = steps.filter(step => !step.parent)

    if(steps.length === 0) {
        return (
            <div className="no-resource-error">
                עדיין אין שלבים במסלול זה
            </div>
        )
    }
    return (
        <div className="tree-container">
            <ul className="steps-tree">
                {parents.map(parent => (
                        <TreeNode
                        step={parent}
                        steps={steps} />
                    ))}
            </ul>
        </div>
    )
}

StepsTree.propTypes = {
    steps: PropTypes.array.isRequired
}

export default StepsTree
