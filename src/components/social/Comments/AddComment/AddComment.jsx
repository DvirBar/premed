import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../redux/comments/actions'
import EditableTextBox from '../../../common/inputs/EditableTextBox/EditableTextBox';

function AddComment({ itemId }) {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const sendComment = text => {
        if(text) {
            const dataObj = {
                text,
                item: itemId
            }
            dispatch(addComment(dataObj))

            setComment('')
        }
    }

    return (
        <EditableTextBox
        value={comment}
        onChange={setComment}
        placeholder="תגובה חדשה..."
        onEnter={sendComment} />
    )
}

export default AddComment
