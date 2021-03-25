import React from 'react'
import { useSelector } from 'react-redux'
import { commentsSelector } from '../../../../redux/comments/selectors'
import CommentItem from './CommentItem/CommentItem'
import Loadbar from '../../../layout/Loadbar'

function CommentsList({ itemId }) {
    const {
        comments,
        loading
    } = useSelector(commentsSelector)
    
    if(loading) {
        return <Loadbar />
    }

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
                itemId={itemId} />
            )}
        </div>
    )
}

export default CommentsList
