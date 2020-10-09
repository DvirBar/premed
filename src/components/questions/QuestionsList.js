import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getQuestGroup } from '../../redux/reducers'
import QuestionItem from './QuestionItem'

function QuestionsList() {
    const { params } = useRouteMatch()
    const { groupId } = params

    const group = useSelector(state => 
        getQuestGroup(state.questgroups.groups, groupId))

    return (
        <div className="questions-list">
            {group.questions.map(quest => 
                <QuestionItem 
                key={quest._id}
                question={quest} />)}
        </div>
    )
}

export default QuestionsList
