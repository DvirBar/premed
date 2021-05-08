import React from 'react';
import StepsProvider from '../../steps/StepsContext'; 
import StepsAdminContent from './StepsAdminContent';

function StepsAdmin() {

    return (
        <StepsProvider isAdmin={true}>
            <StepsAdminContent />
        </StepsProvider>
    )
}

export default StepsAdmin
