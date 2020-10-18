import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleDownvote, toggleUpvote } from '../../redux/actions/topics';


function ItemVotes({ topicId, itemId, upvotes, downvotes, userId }) {

    const dispatch = useDispatch();
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);

    // Set down vote and upvotes state
    useEffect(() => {
        if(upvotes && downvotes) {
            upvotes.find(upvote => upvote === userId)
            ?   setUpVote(true)
            :   setUpVote(false)

            downvotes.find(downvote => downvote === userId)
            ?   setDownVote(true)
            :   setDownVote(false)
        }
    }, [upvotes, downvotes])

    
    const dispatchUpvote = e => {
        e.preventDefault()

        if(downVote) 
            setDownVote(false)

        setUpVote(!upVote)

        dispatch(toggleUpvote(topicId, itemId)) 
    }

    const dispatchDownvote = e => {
        e.preventDefault()

        if(upVote) 
            setUpVote(false)
    
        setDownVote(!downVote)

        dispatch(toggleDownvote(topicId, itemId))
    }

    return (
        <div className="item-votes">
            <span className="item-downvotes">
                <span className="item-downvotes-count">
                    {downvotes.length}
                </span>
                <span
                className="thumb-icons"
                onClick={e => dispatchDownvote(e)}>
                    {downVote 
                    ? <i class="fas fa-thumbs-down"></i>
                    : <i class="far fa-thumbs-down"></i>
                    }
                </span>
            </span>

            <span className="item-upvotes">
                <span className="item-upvotes-count">
                    {upvotes.length}
                </span>
                <span
                className="thumb-icons"
                onClick={e => dispatchUpvote(e)}>
                    {upVote 
                    ? <i class="fas fa-thumbs-up"></i>
                    : <i class="far fa-thumbs-up"></i>
                    }
                </span>
            </span>
        </div>
    )
}

export default ItemVotes
