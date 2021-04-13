import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { getQuestGroupByPath } from '../../redux/questions/actions';
import ContentContainer from '../layout/ContentContainer/ContentContainer';
import QuestionsRouter from './QuestionsRouter';
import TopBar from './TopBar/TopBar';


function Questions() {
    const { params } = useRouteMatch()
    const { pathId } = params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuestGroupByPath(pathId))
    }, [pathId])
    
    return (
        <div>
            <TopBar />
            <ContentContainer>
                <QuestionsRouter />
            </ContentContainer>
        </div>
    )
}

export default Questions
