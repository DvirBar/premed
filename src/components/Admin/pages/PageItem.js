import React, { useState } from 'react';
import PropTypes from 'prop-types'
import SubpageItem from './SubpageItem'
import DropdownMenu from '../../common/DropdownMenu';
import Modal from '../../layout/Modal';
import AddSubPage from './AddSubPage';

function PageItem({ subpages, page }) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)
    
    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleAdd = open => {
        setDisplayAdd(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "הוסף דף",
            action: () => toggleAdd(true)
        },
        {
            name: "ערוך עמוד",
            action: () => console.log("edit page")
        },
        {
            name: "מחק עמוד",
            action: () => console.log("delete page")
        }
    ]

    return (
        <div>
            <p className="block-title" 
            onMouseLeave={() => toggleMenu(false)}>
                <span className="page-title">{page.name}</span>
                <span className="page-menu">
                    <i className="material-icons"
                    onClick={() => toggleMenu(!displayMenu)}>more_vert</i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </span>
            </p>

            <div className="block-content">
                {subpages.length !== 0
                ?   subpages.map(subpage => (
                        <SubpageItem
                        subpage={subpage} />
                    ))
            
                :   <p className="no-resource-error">
                        עדיין אין דפים
                    </p>} 
            </div>

            <Modal
            display={displayAdd}
            toggleModal={toggleAdd}
            title={"הוסף דף"}>
                <AddSubPage 
                pageId={page._id} />
            </Modal>       
        </div>
    )
}

PageItem.propTypes = {
    subpages: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired
}

export default PageItem
