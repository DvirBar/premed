import React, { Fragment, useState } from 'react';
import Modal from '../../layout/Modal';
import GroupList from './GroupList';

function ManageGroups() {
    const [display, setDisplay] = useState(false);

    return (
        <Fragment>
            <i 
            className="material-icons" 
            title="Settings"
            onClick={() => setDisplay(true)}
            >settings</i>
            <Modal display={display} setDisplay={setDisplay} title="הגדרות פרסומים">
                <GroupList />
            </Modal>
        </Fragment>
    )
}

export default ManageGroups
