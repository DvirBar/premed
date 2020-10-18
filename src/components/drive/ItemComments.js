import React from 'react'

function ItemComments({ topicId, itemId, comments }) {
    return (
        <div className="item-comments">
            <span className="comments-icon">
                <i class="far fa-comment"></i>
            </span>
        </div>
    )
}

export default ItemComments
