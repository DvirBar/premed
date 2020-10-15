import React from 'react';
import { useSelector } from 'react-redux';
import { getPageTopics } from '../../../redux/selectors/topics';
import AddTopic from './AddTopic';
import PageTopics from './PageTopics';

function Topics({ page }) {
    const topics = useSelector(state => 
        getPageTopics(state.topics, page._id))

    return (
        <div className="admin-topics">
            <AddTopic 
            pageId={page._id}
            topics={topics} />

            <PageTopics 
            topics={topics} />
        </div>
    )
}

export default Topics
