import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../../redux/selectors/auth'
import useVotes from '../useVotes'
import VoteItem from './VoteItem'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import { voteLibItem } from '../../../../../redux/libraries/actions'

function Votes({ libId, item }) {
    console.log(libId);

    const user = useSelector(selectUser)
    const {
        upvotes,
        downvotes
    } = item

    const {
        upvote,
        downvote
    } = useVotes({ 
        upvotes: useMemo(() => upvotes, [upvotes]), 
        downvotes: useMemo(() => downvotes, [upvotes]), 
        userId: user._id 
    })

    // Callbacks
    const dispatch = useDispatch()
    const dispatchVote = isUpvote => event => {
        event.stopPropagation()

        dispatch(voteLibItem(libId, item._id, isUpvote))
    }

    return (
        <div className="votes">
            <VoteItem
            votes={upvotes}
            hasVoted={upvote}
            onClick={dispatchVote(true)}>
                <ThumbUp style={{fontSize: 20}} />
            </VoteItem>
            <VoteItem
            votes={downvotes}
            hasVoted={downvote}
            onClick={dispatchVote(false)}>
                <ThumbDown style={{fontSize: 20}}/>
            </VoteItem>
        </div>
    )
}

export default Votes
