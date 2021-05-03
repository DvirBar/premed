import React from 'react';
import StepsEditSeciton from './StepsEditSection/StepsEditSeciton';
import StepsContent from './StepsContent/StepsContent';
import StepsProvider from '../../steps/StepsContext'; 

function StepsAdmin() {

    return (
        <StepsProvider isAdmin={true}>
            <StepsContent />
            <StepsEditSeciton />
        </StepsProvider>
    )
}

export default StepsAdmin
