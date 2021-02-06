import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import TreeNode from './TreeNode';
import TreeContent from './TreeContent';
import { getStartingStep } from '../../../redux/selectors/steps';

function StepsTree() {
    const firstStep = useSelector(getStartingStep)
    
    if(!firstStep) {
        return (
            <div className="no-resource-error">
                עדיין אין שלבים במסלול זה
            </div>
        )
    }

    return (
        <TreeContent 
        firstStep={firstStep} />
    )
}

StepsTree.propTypes = {
    steps: PropTypes.array.isRequired,
    selectStep: PropTypes.func.isRequired
}

export default StepsTree
