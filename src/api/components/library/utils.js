import { findTextAndDelete } from '../../../../utils/arrays';

export const downvoteUpvote = (item, userId, isUpvote) => {
    let mainArr, subArr

    if(isUpvote) {
        mainArr = item.upvotes
        subArr = item.downvotes
    } 

    else {
        mainArr = item.downvotes
        subArr = item.upvotes
    }

    // Check if user has already downvoted or upvoted the item
    const found = findTextAndDelete(mainArr, userId)

    /* If user didn't upvote/downvote,
     check if they downvoted/upvoted */
    if(!found) {        
        findTextAndDelete(subArr, userId)
        mainArr.push(userId)
    }

    return item
}