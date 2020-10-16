import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopics } from '../../../redux/actions/topics';
import { getPageTopics } from '../../../redux/selectors/topics';
import AddTopic from './AddTopic';
import PageTopics from './PageTopics';

function Topics({ page }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics());
    }, [])

    const topics = useSelector(state => 
        getPageTopics(state.topics.topics, page._id))

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
