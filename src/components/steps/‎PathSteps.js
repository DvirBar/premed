import React from 'react';
import StepsProvider from './StepsContext';
import StepsContent from '../admin/steps/StepsContent/StepsContent';

function PathSteps() {
    return (
        <StepsProvider isAdmin={false}>
            <StepsContent />
        </StepsProvider>
    )
}

export default PathSteps

