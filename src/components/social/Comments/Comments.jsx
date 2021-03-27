import React, { useEffect, useState} from 'react';
import CommentsList from './CommentsList/CommentsList';
import AddComment from './AddComment/AddComment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByItem } from '../../../redux/comments/actions';
import { commentsSelector } from '../../../redux/comments/selectors';
import Loadbar from '../../layout/Loadbar';

function Comments({ 
    itemId, 
    parent, 
    displayReplies,
    setDisplayReplies }) {
    const dispatch = useDispatch()
   

    useEffect(() => {
        if(itemId && !parent) {
            dispatch(getCommentsByItem(itemId))
        }
    }, [itemId])

    const {
        loading
    } = useSelector(commentsSelector)
 
    if(loading && !parent) {
        return <Loadbar />
    }
    
    return (
        <div 
        className={`comments ${parent ? 'isReply' : ''}`}>
            <CommentsList
            displayReplies={displayReplies}
            toggleDisplayReplies={setDisplayReplies}
            itemId={itemId}
            parentId={parent?._id} />

            {(!parent || displayReplies) &&
                <AddComment
                parent={parent}
                itemId={itemId} />
            }
        </div>      
    )
}

export default Comments
