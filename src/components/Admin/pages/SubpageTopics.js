import React, { useState, useEffect } from 'react'
import TopicList from '../topics/TopicList';
import TopicContent from '../topics/TopicContent';

function SubpageTopics({ topics }) {
    const [selTopic, setSelTopic] = useState({})

    const selectTopic = topic => {
        setSelTopic(topic);
    }

    if(topics.length === 0)
        return <div className="no-resource-error">אין נושאים</div>

    return (
        <div>
            <TopicList 
            topics={topics} 
            selTopic={selTopic}
            selectTopic={selectTopic} />
            
            {Object.keys(selTopic).length !== 0 &&
                <TopicContent 
                topic={selTopic}
                topics={topics} />
            }
        </div>
    )
}

export default SubpageTopics
