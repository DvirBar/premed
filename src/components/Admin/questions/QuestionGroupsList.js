import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestGroups } from '../../../redux/actions/questgroups';
import { getQuestGroupsByPath } from '../../../redux/reducers/questgroups';
import Loadbar from '../../layout/Loadbar';
import QuestionGroupItem from './QuestionGroupItem';

function QuestionGroupsList({ pathId }) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getQuestGroups())
    }, [])

    const loading = useSelector(state => state.questgroups.loading)
    const groups = useSelector(state => 
        getQuestGroupsByPath(state.questgroups.groups, pathId))

    if(loading)
        return <Loadbar />

    return (
        <Fragment>
            <div className="question-groups-list">
                {groups.map(group => 
                    <QuestionGroupItem
                    key={group._id}
                    group={group} />
                )}
            </div>

        </Fragment>
    )
}

export default QuestionGroupsList
