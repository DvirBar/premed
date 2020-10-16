import React from 'react';
import Item from './Item';

function TopicItemsList({ topic }) {
    return (
        <div className="drive-items-grid drive-topic-items-list">
        {topic.items.map(item => 
            <Item key={item._id} item={item} topicId={topic._id} />
            )}        
        </div>
    )
}

export default TopicItemsList
