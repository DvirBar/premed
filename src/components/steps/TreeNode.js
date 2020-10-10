import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function TreeNode({ step, steps, selectStep }) {
    const children = steps.filter(child => child.parent === step._id)
    let prevSteps = new Set()

    for(let child of children) {
        if(!prevSteps.has(child.prev)) {
            prevSteps.add(child.prev)
        }
    }

    prevSteps = Array.from(prevSteps)

    return (
        <li className="tree-node">
            {children.length !== 0 // Base case
            ? ( 
                <Fragment>
                    <fieldset 
                    className="steps-family" 
                    onClick={e => selectStep(step, e)}>
                    <legend>{step.name}</legend>
                        {prevSteps.map(prevStep => 
                            <ul className="steps-level">
                                {children
                                .filter(child => 
                                    child.prev === prevStep)
                                .map(child => 
                                    <TreeNode
                                    step={child}
                                    steps={steps}
                                    selectStep={selectStep} />
                                )}
                            </ul>             
                        )}
                    </fieldset>  
                </Fragment>
            )

            : (
                <span 
                className="node-container"
                onClick={e => selectStep(step, e)}>
                    <span className="node"></span>
                    <span>{step.name}</span>
                </span>
            )
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
