import React, { Fragment, useState } from 'react';
import TopicList from './TopicList';
import TopicContent from './TopicContent';

function PageTopics({ topics }) {

    const [selTopic, setSelTopic] = useState({})
    const [displayEditModal, setDisplayEditModal] = useState(false);
        
    const selectTopic = topic => {
        setSelTopic(topic);
    }

    const toggleEditModal = open => {
        setDisplayEditModal(open)
    }

    if(topics.length === 0) {
        return <p className="no-resource-error">אין נושאים</p>
    }
    
    return (
        <Fragment>
            <TopicList 
            topics={topics} 
            selTopic={selTopic}
            selectTopic={selectTopic} />
            
            {Object.keys(selTopic).length !== 0 &&
                <TopicContent 
                selTopic={selTopic} 
                topics={topics} />
            }
        </Fragment>
    )
}

export default PageTopics
