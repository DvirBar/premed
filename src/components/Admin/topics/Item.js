import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EditItem from './EditItem';

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
                { item.content && item.content.length !== 0 
                ?   <Fragment>
                        <p className="item-title">{item.name}</p>
                        <p className="itme-content">{item.content}</p>
                    </Fragment>
                :   <p className="item-title-only">{item.name}</p>
                }
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
