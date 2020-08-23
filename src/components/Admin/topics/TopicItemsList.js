import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function TopicItemsList({ topic }) {
    const items = topic.items

    return (
        <div className="topic-items-list">
            {items.map(item => 
                <Item 
                key={item._id} 
                topicId={topic._id}
                item={item} />)}
        </div>
    )
}

TopicItemsList.propTypes = {
    topic: PropTypes.object.isRequired
}

export default TopicItemsList
