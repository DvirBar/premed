import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import TreeNode from './TreeNode';
import { getTopSteps } from '../../../redux/selectors/steps';
import TreeContent from './TreeContent';

function StepsTree() {
    const topSteps = useSelector(getTopSteps)
    
    if(topSteps?.length === 0) {
        return (
            <div className="no-resource-error">
                עדיין אין שלבים במסלול זה
            </div>
        )
    }

    return (
        <TreeContent 
        topSteps={topSteps} />
    )
}

StepsTree.propTypes = {
    steps: PropTypes.array.isRequired,
    selectStep: PropTypes.func.isRequired
}

export default StepsTree
