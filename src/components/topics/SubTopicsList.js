import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

function SubTopicsList({ topics }) {
    let { url } = useRouteMatch()
    return (
        <div className="subtopic-list">
            {topics.map(topic => 
                <Link 
                className="subtopic-item"
                key={topic._id}
                to={`${url}/${topic.url}`}>
                    <span className="topic-name">
                        {topic.name}
                    </span>
                </Link>
            )}
        </div>
    )
}

export default SubTopicsList
