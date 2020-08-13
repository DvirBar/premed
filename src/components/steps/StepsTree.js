import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

function StepsTree({ steps, selectStep }) {
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
                        steps={steps}
                        selectStep={selectStep} />
                    ))}
            </ul>
        </div>
    )
}

StepsTree.propTypes = {
    steps: PropTypes.array.isRequired,
    selectStep: PropTypes.func.isRequired
}

export default StepsTree
