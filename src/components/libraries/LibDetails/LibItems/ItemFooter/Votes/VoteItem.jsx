import React from 'react'

function VoteItem({ 
    votes, 
    isUpvote,
    hasVoted, 
    onClick, 
    children }) {

    const stopBubbling = e => {
        if(e) {
            e.stopPropagation()
        }
    } 

    return (
        <div 
        onClick={e => stopBubbling(e)}
        className={`vote-item 
        ${hasVoted ? 'voted' : ''}
        ${isUpvote ? 'upvote' : 'downvote'}`} >
            <div 
            onClick={e => onClick(e)}
            className="thumb-icon">
                {children}
            </div>
            <div>{votes.length}</div>
        </div>
    )
}

export default VoteItem
