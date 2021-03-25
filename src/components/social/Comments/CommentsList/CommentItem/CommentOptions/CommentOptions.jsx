import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../../../../redux/comments/actions';
import DropdownMenu from '../../../../../common/DropdownMenu'
import MoreVert from '@material-ui/icons/MoreVert'
import Report from '@material-ui/icons/Report'

function CommentOptions({ 
    displayEdit, 
    toggleEdit, 
    userId, 
    isAdmin,
    comment }) {
        
    const [displayMenu, setDisplayMenu] = useState(false);

    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const dispatch = useDispatch()


    const removeComment = () => {
        dispatch(deleteComment(comment._id))
    }

    const options = [
        {
            name: "עריכה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחיקה",
            action: () => removeComment()
        }
    ]

    return (
        <div className="comment-options">
        {userId === comment.author || isAdmin 
        ?   !displayEdit && 
                <Fragment>
                    <MoreVert
                    style={{fontSize: 25}}
                    onClick={() => toggleMenu(!displayMenu)} />
                    <DropdownMenu 
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </Fragment>
        :   <Report />
        }
    </div>
    )
}

export default CommentOptions
