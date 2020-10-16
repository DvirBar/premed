import React from 'react';
import { useSelector } from 'react-redux';
import { getPageTopTopics } from '../../redux/selectors/topics';
import Loadbar from '../layout/Loadbar';
import Topic from './Topic';

function TopicsList({ page }) {
    const loading = useSelector(state => state.topics.loading)
    const topics = useSelector(state => 
        getPageTopTopics(state.topics.topics, page._id))

    if(!topics || loading)
        return <Loadbar /> 

    else if(topics.length === 0)
        return <p>עדיין אין נושאים</p>  

    return (
        <div className="drive-items-grid topics-list">
            {topics && topics.map(topic => (
                <Topic key={topic._id} topic={topic} />
            ))}
        </div>
    )
}

export default TopicsList
