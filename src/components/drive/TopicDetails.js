import React, { useState, useEffect, Fragment } from 'react';
import { 
    useRouteMatch, 
    Link,
    useLocation, 
    Route,
    Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from '../routing/ProtectedRoute';
import SubTopicsList from './SubTopicsList';
import TopicItemsList from './TopicItemsList';

function TopicDetails() {
    let { url , params } = useRouteMatch();
    let { topicUrl } = params;
    const [topic, setTopic] = useState({})
    const [children, setChildren] = useState([])

    const selTopics = useSelector(state => state.topics)
    const loading = selTopics.loading

    const fetchedTopic = selTopics.topics.find(topic => topic.url === topicUrl)

    useEffect(() => {
            setTopic(fetchedTopic)
    }, [fetchedTopic])

    useEffect(() => {
        if(topic && Object.keys(topic).length !== 0)
            setChildren(selTopics.topics.filter(curTopic => 
                curTopic.parent === topic._id))
    }, [topic, selTopics])
    
    if((topic && Object.keys(topic).length === 0 || loading) || !topic)
        return <p>Loading...</p>

    return (
        <div className="topic-details">
                <Fragment>
                    <Switch>
                        <Route exact path={`${url}`}>
                            {topic.description &&
                                <div className="topic-description">
                                    {topic.description}
                                </div>
                            }
                            {children.length !== 0 && 
                                <SubTopicsList topics={children} />
                            }   
                            <TopicItemsList topic={topic} />
                        </Route>
                        <Route path={`${url}/:topicUrl`} component={TopicDetails} />
                    </Switch>
                </Fragment>
        </div>
    )
}

export default TopicDetails
