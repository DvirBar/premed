import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../layout/Modal';
import AddPage from './AddPage';
import PageItem from './PageItem';

function Pages() {
    const [displayModal, setDisplayModal] = useState(false);

    const pages = useSelector(state => state.pages.pages)
    const loading =  useSelector(state => state.pages.loading)

    if(loading)
        return <p>Loading...</p>

    const toggleModal = open => {
        setDisplayModal(open)
    }
        
    return (
        <div>
            <button 
            onClick={() => toggleModal(true)}>צור דף</button>
            
            <Modal 
            display={displayModal}
            toggleModal={toggleModal}
            title={"הוסף דף"}>
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
