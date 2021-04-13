import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getQuestGroupByPath } from '../../redux/questions/actions'
import { getAllGroups } from '../../redux/questions/selectors'
import QuestionGroupItem from './QuestionGroupItem'

function QuestionGroupsList() {
    const groups = useSelector(getAllGroups)    
    console.log(groups);
    return (
        <div className="question-groups-list">
            {groups.map(group => 
                <QuestionGroupItem group={group} />
            )}
        </div>
    )
}

export default QuestionGroupsList
