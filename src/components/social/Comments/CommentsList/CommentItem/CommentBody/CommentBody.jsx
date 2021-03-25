import React, { useRef, useState } from 'react'
import CommentText from './CommentText/CommentText'
import CommentOptions from './CommentOptions/CommentOptions'

function CommentBody({ comment, user }) {
    const userId = user._id
    const isAdmin = user.isAdmin

    const allowedPermissions = isAdmin || userId === comment.user._id

    const [displayEdit, setDisplayEdit] = useState(false);

    const ref = useRef()

    return (
         <div className="comment-body">
            <CommentText 
            ref={ref}
            editMode={displayEdit}
            toggleEdit={setDisplayEdit}
            comment={comment} />

            <CommentOptions
            anchorRef={ref}
            allowed={allowedPermissions}
            toggleEdit={setDisplayEdit}
            comment={comment} />
        </div>  
    )
}

export default CommentBody
