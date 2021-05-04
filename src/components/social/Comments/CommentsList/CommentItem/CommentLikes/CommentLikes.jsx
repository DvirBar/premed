import React from 'react'
import useVotes from '../../../../../common/hooks/useVotes'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { useDispatch } from 'react-redux'
import { voteComment } from '../../../../../../redux/comments/actions'
 
function CommentLikes({ userId, comment }) {
    const {
        vote
    } = useVotes({
        singleVotes: comment.likes,
        userId
    })

    const dispatch = useDispatch()

    const likeComment = () => {
        dispatch(voteComment(comment._id))
    }

    return (
        <div className= {`comment-likes
            ${vote ? 'voted' : ''}`}>
            <span className="comment-likes-count">
                {comment.likes.length}
            </span>
            <div 
            onClick={() => likeComment()}
            className="comment-likes__vote-comment">
                {vote 
                ?   <Favorite />
                :   <FavoriteBorder />           
                }
            </div>
        </div>
    )
}

export default CommentLikes


