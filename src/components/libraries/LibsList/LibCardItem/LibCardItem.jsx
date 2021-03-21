import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Card from '../../../common/containers/Card/Card'

function LibCardItem({ lib, noItems }) {
    const { url } = useRouteMatch()

    return (
        <Link to={`${url}/${lib._id}`}>
            <Card
            type={noItems ? 'big' : 'small'}>
                <span className="lib-name">
                    {lib.name}
                </span>
            </Card>
        </Link>
    )
}

export default LibCardItem
