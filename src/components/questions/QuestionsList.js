import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getQuestGroupById } from '../../redux/questions/selectors'
import QuestionItem from './QuestionItem'

function QuestionsList() {
    const { params } = useRouteMatch()
    const { groupId } = params
    const group = useSelector(getQuestGroupById(groupId))

    return (
        <div>
            <h1>
                {group?.name}
            </h1>
            <div className="questions-list">
                {group?.questions.map(quest => 
                    <QuestionItem 
                    key={quest._id}
                    question={quest} />)}
            </div>
        </div>
    )
}

export default QuestionsList
