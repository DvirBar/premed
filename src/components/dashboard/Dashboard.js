import React, { useState } from 'react';
import SectionsList from './SectionsList';
import AddSection from './AddSection';
import Modal from '../layout/Modal';

function Dashboard() {
    const [display, setDisplay] = useState(false);

    const openModal = () => {
        setDisplay(true);
    }

    return (
        <div className="dashboard">
            <div className="add-section" onClick={openModal}>+</div>
            <Modal display={display} setDisplay={setDisplay} title={'צור מתחם'}>
                <AddSection />
            </Modal>
            <SectionsList />
        </div>
    )
}

export default Dashboard;
