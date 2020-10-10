import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import GroupList from './GroupList';

function ManageGroups({ paths, groups }) {
    const [displayModal, setDisplayModal] = useState(false);

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <Fragment>
            <i 
            className="material-icons" 
            title="Settings"
            onClick={() => toggleModal(true)}>
                settings
            </i>
            <Modal 
            display={displayModal} 
            toggleModal={toggleModal} 
            title="הגדרות פרסומים">
                <GroupList 
                groups={groups} 
                paths={paths} />
            </Modal>
        </Fragment>
    )
}

ManageGroups.propTypes = {
    paths: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
}

export default ManageGroups;
