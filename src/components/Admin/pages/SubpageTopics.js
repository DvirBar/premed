import React, { useState, Fragment} from 'react'
import TopicList from '../topics/TopicList';
import TopicContent from '../topics/TopicContent';
import TopicItems from '../topics/TopicItems';

function SubpageTopics({ topics, loading }) {
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
                <Fragment>
                    <TopicContent 
                    topic={selTopic}
                    topics={topics} />
                    <TopicItems topic={selTopic} />
                </Fragment>
            }
        </div>
    )
}

export default SubpageTopics
