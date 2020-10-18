import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import IconObj from './IconsMap';
import ItemVotes from './ItemVotes';
import ItemComments from './ItemComments';

function Item({ topicId, item }) {
    const auth = useSelector(state => state.auth);
    const userId = auth.user._id; 

    return (
        <a 
        href={item.link}
        target="_blank"
        className="drive-grid-item drive-topic-item"
        rel="noopener noreferrer">
            <div className="drive-item-title">{item.name}</div>
            <div className="item-icon">
                <img src={IconObj[item.icon]} />
            </div>
            <div 
            className="item-footer">
                <ItemComments />
                <ItemVotes 
                topicId={topicId}
                itemId={item._id}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                userId={userId} />
            </div>
        </a>
    )
}

Item.propTypes = {
    topicId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default Item
