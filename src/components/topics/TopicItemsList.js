import React from 'react'
import IconObj from './IconsMap';

function TopicItemsList({ topic }) {
    
    return (
        <div className="topic-items-list">
        {topic.items.map(item => 
            <a
            className="material-item" 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer">
                <span className="item-title">{item.name}</span>
                <span className="item-icon">
                    <img src={IconObj[item.icon]} />
                </span>
            </a>
            )}        
        </div>
    )
}

export default TopicItemsList
