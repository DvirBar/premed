import React, { useRef, useState } from 'react'
import MoreVert from '@material-ui/icons/MoreVert'
import Menu from '../../../../common/Menu/Menu'
import EditAnc from './EditAnc'
import VerifyDelete from '../../../../common/VerifyDelete'
import { deleteAnc } from '../../../../../redux/announcements/ancs/actions'
import useOnClickOutside from '../../../../common/useOnClickOutside'

function AncOptions({ anc }) {
    const [display, setDisplay] = useState(false)
    const [displayDelete, setDisplayDelete] = useState(false)
    
    const options = [
        {
            name: 'עריכה',
            action: () => {}
        },
        {
            name: 'מחיקה',
            action: () => setDisplayDelete(true)
        }
    ]

    const ref = useRef(null)
    useOnClickOutside(ref, display, () => setDisplay(false))

    return (
        <div 
        ref={ref}
        className="anc-item__top__options">
            <MoreVert 
            onClick={() => setDisplay(!display)}
            style={{ fontSize: 20 }}/>
            <Menu display={display}>
                {options.map((option, index) => 
                    <div 
                    key={index}
                    onClick={() => option.action()}>
                        {option.name}
                    </div>    
                )}
            </Menu>
            <EditAnc />
            <VerifyDelete
            callback={deleteAnc}
            values={[anc._id]}
            display={displayDelete}
            toggleModal={setDisplayDelete} />
        </div> 
    )
}

export default AncOptions
