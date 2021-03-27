import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editComment } from '../../../../../../../redux/comments/actions';
import EditableTextBox from '../../../../../../common/inputs/EditableTextBox/EditableTextBox';

function CommentText({ 
    editMode, 
    toggleEdit,  
    comment }) {

    const [text, setText] = useState(comment.text)
        
    const dispatch = useDispatch()

    const changeComment = newComment => {
        if(text !== '') {
            const dataObj = {
                text: newComment
            }
    
            dispatch(editComment(comment._id, dataObj))
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
                <EditableTextBox
                value={text}
                onChange={setText}
                placeholder="עריכת תגובה..."
                onEnter={changeComment} />
                <span 
                className="cancel-edit"
                onClick={() => cancelEdit()}>
                    ביטול
                </span>
            </div>
        )
    }
    
    return (
        <div 
        dangerouslySetInnerHTML={{__html: comment.text}}
        className="comment-text" />
    )
}

export default CommentText
