import MoreVert from '@material-ui/icons/MoreVert'
import React, { useRef, useState } from 'react'
import Menu from '../../../../../../common/Menu/Menu'
import useOnClickOutside from '../../../../../../common/useOnClickOutside'
import VerifyDelete from '../../../../../../common/VerifyDelete'
import { deleteGroup } from '../../../../../../../redux/announcements/groups/actions'

function GroupOptions({ groupId }) {
    const [display, setDisplay] = useState(false)
    const [displayDelete, setDisplayDelete] = useState(false)

    const options = [
        {
            name: 'מחיקה',
            action: () => setDisplayDelete(true)
        }
    ]

    const ref = useRef()
    useOnClickOutside(ref, display, () => setDisplay(false))
    return (
        <div 
        className="group-options"
        ref={ref}>
            <MoreVert 
            style={{fontSize: 20}}
            onClick={() => setDisplay(!display)}/>

           <Menu display={display}>
                {options.map((option, index) => 
                    <div 
                    key={index}
                    onClick={() => option.action()}>
                        {option.name}
                    </div>
                )}
           </Menu>

           <VerifyDelete 
           callback={deleteGroup}
           values={[groupId]}
           display={displayDelete}
           toggleModal={setDisplayDelete} />
        </div>
    )
}

export default GroupOptions
