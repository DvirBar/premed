import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../../../../../redux/comments/actions';
import Menu from '../../../../../../common/Menu/Menu';
import MoreVert from '@material-ui/icons/MoreVert';


function CommentOptions({ 
    anchorRef,
    display,
    toggle,
    allowed, 
    toggleEdit, 
    comment }) {

    const dispatch = useDispatch()

    const removeComment = () => {
        dispatch(deleteComment(comment._id))
    }

    const [displayMenu, setDisplayMenu] = useState(false);


    const options = allowed 
    ? [
        {
            name: "עריכה",
            action: () => toggleEdit(true)
        },
        {
            name: "מחיקה",
            action: () => removeComment()
        }
    ]
    : [
        {
            name: "דיווח",
            action: () => {}
        }
    ]

    return (
        <div className="options-anchor">
            <div 
            onClick={() => setDisplayMenu(!display)}>
                <MoreVert />
            </div>

            <Menu
            longTouchRef={anchorRef}
            display={displayMenu}
            toggleDisplay={setDisplayMenu}>
                {options.map(option => 
                    <div onClick={() => option.action()}>
                        {option.name}
                    </div>    
                )}
            </Menu>
        </div>
    )
}

export default CommentOptions
