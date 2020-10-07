import React from 'react'
import QuestionItem from './QuestionItem'

function QuestionsList({ group }) {
    return (
        <div className="questions-list">
            {group.questions.map(question => 
                <QuestionItem 
                question={question}
                groupId={group._id} />
            )}
        </div>
    )
}

export default QuestionsList
