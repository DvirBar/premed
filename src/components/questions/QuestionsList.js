import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getQuestGroupById } from '../../redux/questions/selectors'
import AddQuestion from '../admin/questions/AddQuestion'
import QuestionItem from './QuestionItem'
import { QuestionsContext } from './QuestionsContext'

function QuestionsList() {
    const { params } = useRouteMatch()
    const { groupId } = params
    const group = useSelector(getQuestGroupById(groupId))
    const {
        isAdmin
    } = useContext(QuestionsContext)
    
    return (
        <div>
            <h1>
                {group?.name}
            </h1>
            {isAdmin &&
                <AddQuestion 
                group={group} />
            }
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
