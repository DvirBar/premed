import React, { useState } from 'react';
import PropTypes from 'prop-types';

function StepListItem({ step, steps }) {
    const children = steps.filter(child => child.parent === step._id)

    return (
        <li className="step-list-item">
            <span>{step.name}</span>
            {children && // Base case
                <ul>
                    {children.map(child => 
                        <StepListItem 
                        step={child}
                        steps={steps} />
                    )}
                </ul>
            }
        </li>
    )
}

StepListItem.propTypes = {
    step: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
}

export default StepListItem


// Parents ordered by linking
    // const [ordChildren, setOrdChildren] = useState([children.filter(step => !step.prev)]);
    // let curItem = {} // Holds current item in ordChildren while looping

    // // while(children) {
    // //     curItem = ordChildren[ordChildren.length - 1]
    // //     for(let i=0; i < children.length; i++)  {
    // //         if(children[i].prev === curItem._id) {
    // //             setOrdChildren([...ordChildren, children.splice(i, 1)])
    // //         }
    // //     }
    // // }