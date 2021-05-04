import { MoreVert } from '@material-ui/icons'
import React, { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { deleteQuest } from '../../../redux/questions/actions'
import Menu from '../../common/Menu/Menu'
import useOnClickOutside from '../../common/useOnClickOutside'
import EditQuestion from './EditQuestion'

function QuestionOptions({ question }) {
    const { groupId } = useParams()

    const dispatch = useDispatch()
    const removeQuestion = () => {
        dispatch(deleteQuest(groupId, question._id))
    }

    const [displayEdit, setDisplayEdit] = useState(false)
    
    const options = [
        {
            name: "עריכה",
            action: () => setDisplayEdit(true)
        },
        {
            name: "מחיקה",
            action: () => removeQuestion()
        }
    ]

    const ref = useRef()
    const [displayMenu, setDisplayMenu] = useState(false)

    const toggleMenu = e => {
        if(e) {
            e.stopPropagation()
        }
        setDisplayMenu(!displayMenu)
    }

    useOnClickOutside(ref, displayMenu, () => setDisplayMenu(false))

    return (
        <Fragment>
            <div ref={ref}>
                <div
                className="quesition-options-anchor"
                onClick={toggleMenu}>
                    <MoreVert fontSize='large' />
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
            <EditQuestion 
            display={displayEdit}
            toggleModal={setDisplayEdit}
            groupId={groupId}
            question={question} />
        </Fragment>
        
    )
}

export default QuestionOptions
