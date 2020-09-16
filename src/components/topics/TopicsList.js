import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Topic from './Topic';

function TopicsList({ subpage }) {
    const [topics, setTopics] = useState([])
    const selTopics = useSelector(state => state.topics)
    const loading = selTopics.loading
    const fetchedTopics = selTopics.topics

    useEffect(() => {
        setTopics(fetchedTopics.filter(topic => 
            topic.subpage === subpage?._id &&
            !topic.parent))
    }, [fetchedTopics, subpage])

    if(topics.length === 0)
        return <p>עדיין אין נושאים</p>  

    if(!topics || loading)
        return <p>Loading</p> 

    return (
        <div className="topics-list">
            {topics && topics.map(topic => (
                <Topic key={topic._id} topic={topic} />
            ))}
        </div>
    )
}

export default TopicsList
