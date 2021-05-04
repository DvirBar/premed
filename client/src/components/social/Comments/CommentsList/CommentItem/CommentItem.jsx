import React, { useState } from 'react'
import CommentLikes from './CommentLikes/CommentLikes';
import useDateGap from '../../../../common/useDateGap';
import Reply from '@material-ui/icons/Reply';
import CommentBody from './CommentBody/CommentBody';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/selectors/auth';
import Comments from '../../Comments';

function CommentItem({ comment, itemId }) {
    const user = useSelector(selectUser)
    
    const dateGap = useDateGap()
    const [displayReplies, setDisplayReplies] = useState(false)

    return (
        <div className="comment-item">
            <div className="item-content">
                <span className="comment-author">
                    {comment.user.firstName} {comment.user.lastName} 
                    &nbsp;({comment.user.username})
                </span>
                <CommentBody 
                comment={comment} 
                user={user} />
            
                <div className="comment-footer">
                    <CommentLikes 
                    userId={user._id}
                    comment={comment} />
                    <Reply 
                    onClick={() => setDisplayReplies(!displayReplies)} />
                    <span>
                        {dateGap(comment.dateCreated)}
                    </span>
                </div>
            </div>
           
            <Comments
            itemId={itemId}
            displayReplies={displayReplies}
            setDisplayReplies={setDisplayReplies}
            parent={comment} />
        </div>
    )
}

export default CommentItem
