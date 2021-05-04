import React from 'react'
import Modal from '../../../../layout/Modal'
import moment from 'moment'

function ItemDetails({ item, display, toggleDisplay }) {
    const title = "פרטים על " + item.name
    
    return (
        <Modal
        title={title}
        display={display}
        toggleModal={toggleDisplay}>
            <div className="lib-item-details">
                <div className="lib-item-details__top">
                    <div className="lib-item-details__top__date-created">
                        תאריך ההעלאה:&nbsp;
                        {moment(item.meta.uploadedAt 
                                || new Date())
                        .format("ה-DD בMMMM, YYYY")}
                    </div>
                    {item.meta.credit &&
                        <div className="lib-item-details__top__credit">
                            קרדיט ל{item.meta.credit}
                        </div>
                    }
                </div>

                <div dangerouslySetInnerHTML={{__html: item.info}} />                
            </div>
        </Modal>
    )
}

export default ItemDetails
