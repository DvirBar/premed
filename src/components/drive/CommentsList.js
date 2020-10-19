import React from 'react'
import CommentItem from './CommentItem'

function CommentsList({ topicId, itemId, comments }) {

    if(comments.length === 0) {
        return <div className="no-resource-error">
            אין תגובות
        </div>
    }
    
    return (
        <div className="comments-list">
            {comments.map(comment => 
                <CommentItem
                key={comment._id}
                comment={comment}
                topicId={topicId}
                itemId={itemId} />
            )}
        </div>
    )
}

export default CommentsList
