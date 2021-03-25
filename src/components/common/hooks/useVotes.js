import React, { useEffect, useState } from 'react'

function useVotes({ 
    singleVotes, 
    upvotes,
    downvotes, 
    userId 
}) {
    const isUserInVotes = votes => {
        if(votes.find(vote => vote === userId)) {
            return true
        }

        return false
    }
    
    const [vote, setVote] = useState(false)
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
        
    useEffect(() => {
        if(singleVotes) {
           setVote(isUserInVotes(singleVotes))
        }    
   
        else if(upvotes && downvotes) {
            setUpvote(isUserInVotes(upvotes))
            setDownvote(isUserInVotes(downvotes))
        }
    }, [singleVotes, upvotes, downvotes])

   
    return {
        upvote,
        downvote,
        vote
    }
} 

export default useVotes
