import React, { Fragment, useEffect, useState } from 'react';
import CommentsList from './CommentsList/CommentsList';
import AddComment from './AddComment/AddComment';
import { useDispatch } from 'react-redux';
import { getCommentsByItem } from '../../../redux/comments/actions';

function Comments({ itemId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(itemId) {
            dispatch(getCommentsByItem(itemId))
        }
    }, [itemId])
    
    return (
            <div 
            className="item-comments">
                <CommentsList
                itemId={itemId} />

                <AddComment
                itemId={itemId} />
            </div>      
    )
}

export default Comments
