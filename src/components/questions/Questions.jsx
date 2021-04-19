import React from 'react'
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import QuestionsRouter from './QuestionsRouter';
import TopBar from './TopBar/TopBar';
import QuestionsProvider from './QuestionsContext'


function Questions() {
    return (
        <div>
            <TopBar />
            <QuestionsProvider isAdmin={false}>
                <ContentContainer>
                    <QuestionsRouter />
                </ContentContainer>
            </QuestionsProvider>
         
        </div>
    )
}

export default Questions
