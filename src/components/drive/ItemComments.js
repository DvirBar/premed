import React, { Fragment, useState } from 'react';
import Modal from '../layout/Modal';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

function ItemComments({ topicId, itemId, itemName, comments }) {
    const [display, setDisplay] = useState(false)

    const toggleModal = toggle => {
        setDisplay(toggle)
    }


    const modalTitle = "תגובות על " + itemName;
    
    return (
            <div 
            className="item-comments"
            onClick={(e => e.preventDefault())}>
                <span 
                className="comments-icon"
                onClick={() => toggleModal(true)}>
                    <i class="far fa-comment"></i>
                </span>
                <Modal 
                display={display}
                toggleModal={toggleModal}
                title={modalTitle}>
                    <CommentsList
                    comments={comments}
                    topicId={topicId}
                    itemId={itemId} />

                    <AddComment
                    topicId={topicId}
                    itemId={itemId} />
                </Modal>
            </div>      
    )
}

export default ItemComments
