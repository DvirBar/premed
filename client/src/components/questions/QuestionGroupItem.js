import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Card from '../common/containers/Card/Card'

function QuestionGroupItem({ group }) {
    const { url } = useRouteMatch()

    return (
        <Link to={`${url}/${group._id}`}>
            <Card>
                {group.name}
            </Card>
        </Link>
    )
}

export default QuestionGroupItem
