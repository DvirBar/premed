import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import GroupList from './GroupList';

function ManageGroups(props) {
    const [display, setDisplay] = useState(false);

    return (
        <Fragment>
            <i 
            className="material-icons" 
            title="Settings"
            onClick={() => setDisplay(true)}
            >settings</i>
            <Modal display={display} setDisplay={setDisplay} title="הגדרות פרסומים">
                <GroupList
                paths = {props.paths}
                groups = {props.groups}
                loadPaths = {props.loadPaths}
                loadGroups = {props.loadGroups}
                />
            </Modal>
        </Fragment>
    )
}

ManageGroups.propTypes = {
    paths: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    loadPaths: PropTypes.bool.isRequired,
    loadGroups: PropTypes.bool.isRequired
}

export default ManageGroups;
