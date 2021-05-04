import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getAllGroups } from '../../redux/questions/selectors'
import AddQuestionGroup from '../admin/questions/AddQuestionGroup'
import QuestionGroupItem from './QuestionGroupItem'
import { QuestionsContext } from './QuestionsContext'
import Grid from '../layout/Grid/Grid';

function QuestionGroupsList() {
    const groups = useSelector(getAllGroups)
    
    const { 
        isAdmin
    } = useContext(QuestionsContext)
    return (
        <Grid>
            {isAdmin &&
                <AddQuestionGroup />
            }
            {groups.map(group => 
                <QuestionGroupItem 
                key={group._id}
                group={group} />
            )}
        </Grid>
    )
}

export default QuestionGroupsList
