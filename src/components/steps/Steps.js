import React from 'react';
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import StepRouter from './StepRouter';
import TopBar from './TopBar';

function Steps() {
    return (
        <div>
            <TopBar />
            <ContentContainer>
                <StepRouter />
            </ContentContainer>
        </div>
    )
}

export default Steps