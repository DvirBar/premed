import React, { Fragment, useState } from 'react';
import { deleteQuest } from '../../../redux/questions/actions';
import VerifyDelete from '../../common/VerifyDelete';
import EditQuestion from './EditQuestion';

function QuestionItem({ question, groupId }) {
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleDelete = (toggle, event) => {
        if(toggle) {
            event.stopPropagation()
        }
        
        setDisplayDelete(toggle)
    }

    return (
        <Fragment>
            <div 
            className="question-item"
            onClick={() => toggleEdit(true)}>
                <p className="question-header">
                    <span className="question-name">
                        {question.question}
                    </span>
                    <i 
                    className="material-icons"
                    onClick={e => toggleDelete(true, e)}>
                        delete
                    </i>
                </p>
                <div className="question-content">
                    <p className="question-answer">
                        {question.answer}
                    </p>
                    {question.source_link &&
                        <a 
                        href={question.source_link}
                        className="question-source"
                        target="_blank"
                        rel="noopener norefrrer"
                        onClick={event => event.stopPropagation()}>
                            צפייה במקור
                        </a>
                    }
                </div>
            </div>

            <EditQuestion
            groupId={groupId}
            question={question}
            display={displayEdit}
            toggleModal={toggleEdit} />

            <VerifyDelete
            callback={deleteQuest}
            values={[groupId, question._id]}
            display={displayDelete}
            toggleModal={toggleDelete} />
        </Fragment>
    )
}

export default QuestionItem
