import React from 'react';
import PropTypes from 'prop-types';
import AddItem from './AddItem'
import TopicItemsList from './TopicItemsList';

function TopicItems({ topic }) {
    return (
        <div>

            <TopicItemsList topic={topic} />
        </div>
    )
}

export default TopicItems
