import React, { useState } from 'react'
import AddGroup from './AddGroup/AddGroup'
import GroupsList from './GroupsList/GroupsList'
import Settings from '@material-ui/icons/Settings'
import Modal from '../../../../layout/Modal'

function Groups() {
    const [display, setDisplay] = useState(false)

    return (
        <div>
            <Settings 
            style={{ fontSize: 25}}
            onClick={() => setDisplay(true)}/>
            <Modal
            title="קבוצות פרסומים"
            display={display}
            toggleModal={setDisplay}>
                <AddGroup />
                <GroupsList />
            </Modal>
        </div>
    )
}

export default Groups
