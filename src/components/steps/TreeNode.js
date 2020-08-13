import React from 'react';
import PropTypes from 'prop-types';

function TreeNode({ step, steps, selectStep }) {
    const children = steps.filter(child => child.parent === step._id)

    const topLayer = {
        position: "relative", 
        bottom: -12,
        backgroundColor: "#fff",
        padding: "0 0.2rem",
        cursor: "pointer"
    }

    const defaultStyle = {}

    return (
        <li className="tree-node">
            <span 
            className="node-container"
            onClick={() => selectStep(step)}>
                {children.length === 0 && <span className="node"></span> }
                <span style={children.length !== 0 ? topLayer : defaultStyle}>{step.name}</span>
            </span>
            {children.length !== 0 && // Base case
                <ul className="family-container">
                    {children.map(child => 
                        <TreeNode
                        step={child}
                        steps={steps}
                        selectStep={selectStep} />
                    )}
                </ul>
            }
        </li>
    )
}

TreeNode.propTypes = {
    step: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
    selectStep: PropTypes.func.isRequired
}

export default TreeNode
