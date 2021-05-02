import React, { useState } from 'react'
import CommentText from './CommentText/CommentText'
import CommentOptions from './CommentOptions/CommentOptions'

function CommentBody({ comment, user }) {
    const userId = user._id
    const isAdmin = user.isAdmin

    const allowedPermissions = isAdmin || userId === comment.user._id

    const [displayEdit, setDisplayEdit] = useState(false);

    return (
         <div className="comment-body">
            <CommentText
            editMode={displayEdit}
            toggleEdit={setDisplayEdit}
            comment={comment} />

            <CommentOptions
            allowed={allowedPermissions}
            toggleEdit={setDisplayEdit}
            comment={comment} />
        </div>  
    )
}

export default CommentBody
