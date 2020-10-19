import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../redux/actions/topics';
import DropdownMenu from '../common/DropdownMenu';
import useDateGap from '../common/useDateGap';
import CommentLikes from './CommentLikes';
import CommentText from './CommentText';

function CommentItem({  topicId, itemId, comment }) {
    const user = useSelector(state => state.auth.user)
    const userId = user._id;
    const isAdmin = user.isAdmin;

    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);


    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }


    const dispatch = useDispatch()

    const removeComment = () => {
        dispatch(deleteComment(topicId, itemId, comment._id))
    }

    const dateGap = useDateGap()

    const options = [
        {
            name: "עריכה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחיקה",
            action: () => removeComment()
        }
    ]
    
    return (
        <div className="comment-item">
            <div className="comment-details">
                <span className="comment-author">
                    {comment.author}
                </span>
                <CommentText 
                editMode={displayEdit}
                toggleEdit={toggleEdit}
                topicId={topicId}
                itemId={itemId}
                comment={comment} />
                <div className="comment-footer">
                   <CommentLikes 
                    topicId={topicId}
                    itemId={itemId}
                    commentId={comment._id}
                    userId={userId}
                    likes={comment.likes} />
                    <i className="material-icons">
                        reply
                    </i>
                    <span>
                        {dateGap(comment.date)}
                    </span>
                </div>
            </div>
            <div className="comment-options">
                {userId === comment.author || isAdmin 
                ?   !displayEdit && 
                        <Fragment>
                            <i 
                            className="material-icons"
                            onClick={() => toggleMenu(!displayMenu)}>
                                more_vert
                            </i>
                            <DropdownMenu 
                            display={displayMenu}
                            toggleMenu={toggleMenu}
                            options={options} />
                        </Fragment>
                :   <i className="material-icons">
                        report
                    </i>
                }
            </div>
        </div>
    )
}

export default CommentItem
