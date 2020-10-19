import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLikeComment } from '../../redux/actions/topics'

function CommentLikes({ topicId, itemId, commentId, likes, userId }) {
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        setHasLiked(likes.includes(userId) ? true : false)
    }, [likes])

    const dispatch = useDispatch()
    const toggleCommentLikes = () => {
        dispatch(toggleLikeComment(topicId, itemId, commentId))
    }

    return (
        <div className={hasLiked
            ?   "comment-likes liked"
            :   "comment-likes"}>
            <span className="comment-likes-count">
                {likes.length}
            </span>
            {hasLiked
                ?
                    <i 
                    className="material-icons"
                    onClick={() => toggleCommentLikes()}>
                        favorite
                    </i>
                :
                    <i 
                    className="material-icons"
                    onClick={() => toggleCommentLikes()}>
                        favorite_border
                    </i>
            }
        </div>
    )
}

export default CommentLikes
