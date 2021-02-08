import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loadbar from '../../layout/Loadbar';
import { getUnisByPath } from '../../../redux/selectors/unis';
import StepsEditSeciton from './StepsEditSection/StepsEditSeciton';
import { pathsSelector } from '../../../redux/selectors/paths';
import StepsContent from './StepsContent/StepsContent';
import StepsProvider from '../../steps/StepsContext';

function StepsAdmin() {
    return (
        <StepsProvider isAdmin={true}>
            <StepsContent />
        </StepsProvider>
    )
}

export default StepsAdmin
