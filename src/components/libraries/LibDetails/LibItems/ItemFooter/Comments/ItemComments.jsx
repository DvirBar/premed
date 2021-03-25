import React, { useState } from 'react'
import Forum from '@material-ui/icons/Forum'
import Modal from '../../../../../layout/Modal'
import Comments from '../../../../../social/Comments/Comments'

function ItemComments({ item }) {
    const [display, setDisplay] = useState(false)
    const title = 'תגובות על ' + item.name
    const stopBubbling = event => {
        if(event) {
            event.stopPropagation()
        }
    }
    
    return (
        <div 
        onClick={event => stopBubbling(event)}
        className="comments-wrapper">
            <Forum 
            onClick={() => setDisplay(true)}
            style={{ fontSize: 25 }} />
            <Modal
            title={title}
            display={display}
            toggleModal={setDisplay}>
                {display &&
                    <Comments itemId={item._id} />
                }
            </Modal>
        </div>
    )
}

export default ItemComments
