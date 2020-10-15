import React, { Fragment } from 'react';
import EditTopic from './EditTopic';
import AddItem from './AddItem';
import TopicItemsList from './TopicItemsList';

function TopicContent({ selTopic, topics }) {
    return (
        <Fragment>
            <div className="topic-modify">
                <EditTopic
                topic={selTopic}
                topics={topics} />
                <AddItem topic={selTopic} />
            </div>
            <TopicItemsList topic={selTopic} />
        </Fragment>
    )
}

export default TopicContent
