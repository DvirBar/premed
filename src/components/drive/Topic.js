import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Topic({ topic }) {
    let location = useLocation()

    return (
        <Link 
        className="topic"
        to={`${location.pathname}/${topic.url}`}>
            <span className="drive-grid-item drive-topic-name">
                {topic.name}
            </span>
            <div className="background-filter-cover"></div>
        </Link>
    )
}

export default Topic
