import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../../../../../redux/comments/actions';
import Menu from '../../../../../../common/Menu/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import useOnClickOutside from '../../../../../../common/useOnClickOutside'

function CommentOptions({ 
    allowed, 
    toggleEdit, 
    comment }) {
    
    const dispatch = useDispatch()

    const removeComment = () => {
        dispatch(deleteComment(comment._id))
    }

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

    const [displayMenu, setDisplayMenu] = useState(false);


    const ref = useRef(null)
    useOnClickOutside(ref, displayMenu, () => setDisplayMenu(false))

    return (
        <div ref={ref}>
            <div 
            className="options-anchor"
            onClick={() => setDisplayMenu(!displayMenu)}>
                <MoreVert />
            </div>

            <Menu
            display={displayMenu}>
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
