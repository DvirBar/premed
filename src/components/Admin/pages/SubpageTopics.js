import React, { useState, Fragment} from 'react'
import TopicList from '../topics/TopicList';
import TopicContent from '../topics/TopicContent';
import AddItem from '../topics/AddItem';
import TopicItemsList from '../topics/TopicItemsList';

function SubpageTopics({ topics, loading }) {
    const [selTopic, setSelTopic] = useState({})
    const [displayEditModal, setDisplayEditModal] = useState(false);

    const selectTopic = topic => {
        setSelTopic(topic);
    }

    const toggleEditModal = open => {
        setDisplayEditModal(open)
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
                <Fragment>
                        <div className="topic-modify">
                            <TopicContent 
                            topic={selTopic}
                            topics={topics} />
                            <AddItem topic={selTopic} />
                        </div>
                        <TopicItemsList topic={selTopic} />
                </Fragment>
            }
        </div>
    )
}

export default SubpageTopics
