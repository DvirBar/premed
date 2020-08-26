import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import EditItem from './EditItem';
import IconObj from '../../topics/IconsMap';

function Item({ topicId, item }) {
    const [displayModal, setDisplayModal] = useState(false)

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <Fragment>
            <div 
            className="material-item" 
            onClick={() => toggleModal(true)}>
                <p className="item-title">{item.name}</p>
                <p className="item-icon">
                    <img src={IconObj[item.icon]} />
                </p>
            </div> 
            <EditItem 
            displayModal={displayModal}
            toggleModal={toggleModal}
            topicId={topicId}
            item={item} />
        </Fragment>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired
}

export default Item
