import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { getQuestGroupsByPath } from '../../redux/reducers'
import Loadbar from '../layout/Loadbar'
import QuestionGroupItem from './QuestionGroupItem'

function QuestionGroupsList() {
    const { params } = useRouteMatch()
    const { pathId } = params

    const groups = useSelector(state => 
        getQuestGroupsByPath(state.questgroups.groups, pathId))

    const loading = useSelector(state => state.questgroups.loading)

    if(loading) 
        return <Loadbar />

    return (
        <div className="question-groups-list">
            {groups.map(group => 
                <QuestionGroupItem group={group} />
            )}
        </div>
    )
}

export default QuestionGroupsList
