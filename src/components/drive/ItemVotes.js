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
                <span className={downVote 
                    ?   "item-count voted"
                    :   "item-count"}>
                    {downvotes.length}
                </span>
                <span
                className="thumb-icon"
                onClick={e => dispatchDownvote(e)}>
                    <i class={downVote 
                    ?   "material-icons voted"
                    :   "material-icons"}>thumb_down</i>
                </span>
            </span>

            <span className="item-upvotes">
                <span className={upVote 
                    ?   "item-count voted"
                    :   "item-count"}>
                    {upvotes.length}
                </span>
                <span
                className="thumb-icon"
                onClick={e => dispatchUpvote(e)}>
                    <i class={upVote 
                    ?   "material-icons voted"
                    :   "material-icons"}>thumb_up</i>
                </span>
            </span>
        </div>
    )
}

export default ItemVotes
