import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/topics';

function AddComment({ topicId, itemId }) {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const sendComment = e => {
        if(e.key === "Enter" && comment !== '') {
            const dataObj = {
                text: comment
            }

            dispatch(addComment(topicId, itemId, dataObj))

            setComment('')
        }
    }

    return (
        <input 
        type="text"
        placeholder="הוספת תגובה"
        className="add-comment"
        onChange={e => setComment(e.target.value)}
        onKeyPress={e => sendComment(e)}
        value={comment} />
    )
}

export default AddComment
