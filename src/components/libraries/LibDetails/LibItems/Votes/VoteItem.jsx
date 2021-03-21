import React from 'react'

function VoteItem({ 
    votes, 
    hasVoted, 
    onClick, 
    children }) {

    return (
        <div 
        onClick={e => onClick(e)}
        className={`vote-item 
        ${hasVoted ? 'voted' : ''}`} >
            <div>{children}</div>
            <div>{votes.length}</div>
        </div>
    )
}

export default VoteItem
