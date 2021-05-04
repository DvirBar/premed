import React from 'react'
import ContentContainer from '../layout/Containers/ContentContainer/ContentContainer';
import QuestionsRouter from './QuestionsRouter';
import TopBar from './TopBar/TopBar';
import QuestionsProvider from './QuestionsContext'
import { useSelector } from 'react-redux';
import { isLoading } from '../../redux/loader/selectors';
import { QUEST_GROUP } from '../../redux/questions/types';
import Loadbar from '../layout/Loadbar';


function Questions() {
    const loading = useSelector(isLoading(QUEST_GROUP))

    return (
        <div>
            <TopBar />
            <QuestionsProvider isAdmin={false}>
                <ContentContainer>
                    {loading 
                    ?   <Loadbar />
                    :   <QuestionsRouter />
                    }
                </ContentContainer>
            </QuestionsProvider>
         
        </div>
    )
}

export default Questions
