import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TreeContent from './TreeContent';
import { getStartingStep } from '../../../redux/selectors/steps';

function StepsTree() {
    const firstStep = useSelector(getStartingStep)

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
