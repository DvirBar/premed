import React, { Fragment, useEffect, useState } from 'react'
import TopicItem from './TopicItem'

function TopicList({ topics, selTopic, selectTopic }) {
    const topTopics = topics.filter(topic => !topic.parent)

    if(topics.length === 0)
        return (
            <div className="no-resource-error">
                אין עדיין נושאים    
            </div>
        )

    return (
        <Fragment>
            {topTopics &&
                <div className="topics-list"> 
                    <TopicItem 
                    siblings={topTopics}
                    topics={topics}
                    selTopic={selTopic}
                    selectTopic={selectTopic} />
                </div>
            }
        </Fragment>        
    )
}

export default TopicList
