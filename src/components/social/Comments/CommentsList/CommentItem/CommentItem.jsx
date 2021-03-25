import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../redux/selectors/auth';
import CommentLikes from './CommentLikes/CommentLikes';
import CommentOptions from './CommentOptions/CommentOptions';
import CommentText from './CommentText/CommentText';
import useDateGap from '../../../../common/useDateGap'
import Reply from '@material-ui/icons/Reply'

function CommentItem({  itemId, comment }) {
    const user = useSelector(selectUser)
    const userId = user._id;
    const isAdmin = user.isAdmin;

    const [displayEdit, setDisplayEdit] = useState(false);

    const dateGap = useDateGap()

    return (
        <div className="comment-item">
            <span className="comment-author">
                {comment.user.firstName} {comment.user.lastName} 
                &nbsp;({comment.user.username})
            </span>
            <div className="comment-main">
                <CommentText 
                editMode={displayEdit}
                toggleEdit={setDisplayEdit}
                itemId={itemId}
                comment={comment} />

                <CommentOptions
                displayEdit={displayEdit}
                toggleEdit={setDisplayEdit}
                comment={comment}
                userId={userId}
                isAdmin={isAdmin}
                itemId={itemId} />
            </div>  
        
            <div className="comment-footer">
                <CommentLikes 
                userId={userId}
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
