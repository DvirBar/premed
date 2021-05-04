import moment from 'moment'
import React from 'react'
import Modal from '../../layout/Modal'

function AncDetails({ anc, display, toggleDisplay }) {
    const formatDate = moment(anc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")

    return (
        <Modal 
        display={display} 
        toggleModal={toggleDisplay}
        title={anc.title}
        subTitle={formatDate}>
            <div className="anc-details">
                <div 
                dangerouslySetInnerHTML={{__html: anc.content}}
                className="anc-details__content" />
            </div>
        </Modal>
)
}

export default AncDetails
