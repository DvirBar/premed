import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../../redux/comments/actions'
import EditableTextBox from '../../../common/inputs/EditableTextBox/EditableTextBox';

function AddComment({ itemId, parent }) {
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const sendComment = text => {
        if(text) {
            const dataObj = {
                text,
                item: itemId,
                parent: parent?._id
            }
            dispatch(addComment(dataObj))

            setComment('')
        }
    }

    const placeholder = !parent 
    ? "תגובה חדשה..."
    : `הגב/הגיבי לתגובה של ${parent.user.firstName + ' ' + parent.user.lastName}...`

    return (
        <EditableTextBox
        value={comment}
        onChange={setComment}
        placeholder={placeholder}
        onEnter={sendComment} />
    )
}

export default AddComment
