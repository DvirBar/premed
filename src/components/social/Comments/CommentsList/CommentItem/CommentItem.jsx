import React from 'react'
import CommentLikes from './CommentLikes/CommentLikes';
import useDateGap from '../../../../common/useDateGap';
import Reply from '@material-ui/icons/Reply';
import CommentBody from './CommentBody/CommentBody';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/selectors/auth';

function CommentItem({ comment }) {
    const user = useSelector(selectUser)
    
    const dateGap = useDateGap()
    return (
        <div className="comment-item">
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
                <Reply />
                <span>
                    {dateGap(comment.dateCreated)}
                </span>
            </div>
        </div>
    )
}

export default CommentItem
