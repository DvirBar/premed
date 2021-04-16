import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getQuestGroupByPath } from '../../redux/questions/actions';

export const QuestionsContext = createContext()

const QuestionsProvider = ({ children, isAdmin }) => {
    const value = {
        isAdmin
    }

    const { pathId, groupId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getQuestGroupByPath(pathId))
    }, [pathId])

    return (
        <QuestionsContext.Provider 
        value={value}>
            {children}
        </QuestionsContext.Provider>
    )
}

export default QuestionsProvider
