import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editComment } from '../../redux/actions/topics';

function CommentText({ editMode, toggleEdit, topicId, 
    itemId, comment }) {
    const [text, setText] = useState(comment.text);

    const dispatch = useDispatch()

    const changeComment = e => {
        if(e.key === "Enter" && text !== '') {
            const dataObj = {
                text
            }
            dispatch(editComment(topicId, itemId, comment._id, dataObj))
            toggleEdit(false)
        }
    }

    const cancelEdit = () => {
        toggleEdit(false)
        setText(comment.text)
    }

    if(editMode) {
        return (
            <div className="comment-text">
                <input 
                className="add-comment"
                onChange={e => setText(e.target.value)}
                value={text}
                placeholder="כתיבת תגובה..."
                onKeyPress={e => changeComment(e)} />

                <span 
                className="cancel-edit"
                onClick={() => cancelEdit()}>
                    ביטול
                </span>
            </div>
        )
    }
    return (
        <div className="comment-text">
            {text} 
        </div>
    )
}

export default CommentText
