import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../layout/Modal';
import AddPage from './AddPage';
import PageItem from './PageItem'; 
import Loadbar from '../../layout/Loadbar';

function Pages() {
    const [displayModal, setDisplayModal] = useState(false);

    const pages = useSelector(state => state.pages.pages)
    const loading =  useSelector(state => state.pages.loading)

    const toggleModal = toggle => {
        setDisplayModal(toggle)
    }

    
    if(loading)
        return <Loadbar />
        
    return (
        <div className="pages-admin">
            <button 
            onClick={() => toggleModal(true)}>יצירת דף</button>
            
            <Modal 
            display={displayModal}
            toggleModal={toggleModal}
            title="דף חדש">
                <AddPage />
            </Modal>
            
            {pages && pages.map(page => (
                <PageItem 
                subpages={page.subpages}
                page={page}/>
            ))}
        </div>
    )
}

export default Pages
