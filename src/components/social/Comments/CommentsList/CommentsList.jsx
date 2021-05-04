import React from 'react'
import { useSelector } from 'react-redux'
import { getCommentsByParent } from '../../../../redux/comments/selectors'
import CommentItem from './CommentItem/CommentItem'

function CommentsList({ 
    displayReplies,
    toggleDisplayReplies,
    parentId, 
    itemId, 
}) {
    const comments = useSelector(getCommentsByParent(parentId))
    

    const showRepliesText = comments.length > 1
    ?   `הצגת ${comments.length} תגובות`
    :   'הצגת תגובה'

    if(comments.length === 0) {
        if(!parentId) {
            return (
                <div className="no-resource-error">
                    אין תגובות
                </div>
            )
            
        }   
        
        return null
    }
    
    return (
        <div className="comments-list">
            {(!parentId || displayReplies)
            ?   comments.map(comment => 
                    <CommentItem
                    itemId={itemId}
                    key={comment._id}
                    comment={comment} />
                )
            :   <span 
                onClick={() => toggleDisplayReplies(true)}
                className="show-replies">
                    {showRepliesText}
                </span>
            }
        </div>
    )
}

export default CommentsList
