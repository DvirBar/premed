import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestGroupByPath } from '../../../redux/questions/actions';
import { getAllGroups } from '../../../redux/questions/selectors';
import Loadbar from '../../layout/Loadbar';
import QuestionGroupItem from './QuestionGroupItem';

function QuestionGroupsList({ pathId }) {
    const dispatch = useDispatch();
    console.log(pathId);
    useEffect(() => {
        if(pathId) {
            dispatch(getQuestGroupByPath(pathId))
        }
    }, [pathId])

    const groups = useSelector(getAllGroups)

    return (
        <div className="question-groups-list">
            {groups.map(group => 
                <QuestionGroupItem
                key={group._id}
                group={group} />
            )}
        </div>
    )
}

export default QuestionGroupsList
