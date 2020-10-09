import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

function QuestionGroupItem({ group }) {
    const { url } = useRouteMatch()

    return (
        <div className="question-group-item">
            <Link to={`${url}/${group._id}`}>
                {group.name}
            </Link>
        </div>
    )
}

export default QuestionGroupItem
