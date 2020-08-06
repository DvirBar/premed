import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StepListItem from './StepListItem';

function ListView({ steps, selStep, setSelStep }) {
    const parents = steps.filter(step => !step.parent)
    
    return (
        <div className="list-view">
            <ul className="steps-list">
                {parents.map(parent => (
                    <StepListItem
                    step={parent}
                    steps={steps} />
                ))}
            </ul>
        </div>
    )
}

ListView.propTypes = {
    steps: PropTypes.array.isRequired,
    selStep: PropTypes.string.isRequired,
    setSelStep: PropTypes.func.isRequired
}

export default ListView

// // Parents ordered by linking
    // const [ordParents, setOrdParents] = useState([parents.filter(step => !step.prev)]);
    // let curItem = {} // Holds current item in ordParents while looping

    // // while(parents) {
    // //     curItem = ordParents[ordParents.length - 1]
    // //     for(let i=0; i < parents.length; i++)  {
    // //         if(parents[i].prev === curItem._id) {
    // //             setOrdParents([...ordParents, parents.splice(i, 1)])
    // //             console.log(parents);
    // //         }
    // //     }
    // // }