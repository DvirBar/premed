import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import SubpageItem from './SubpageItem'
import DropdownMenu from '../../common/DropdownMenu';
import Modal from '../../layout/Modal';
import AddSubPage from './AddSubPage';
import EditPage from './EditPage';
import VerifyDelete from '../../common/VerifyDelete';
import { deletePage } from '../../../redux/actions/pages';

function PageItem({ subpages, page }) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)
    
    const toggleMenu = toggle => {
        setDisplayMenu(toggle)
    }

    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleVer = toggle => {
        setDisplayVer(toggle)
    }

    const options = [
        {
            name: "הוספת דף",
            action: () => toggleAdd(true)
        },
        {
            name: "עריכת עמוד",
            action: () => toggleEdit(true)
        },
        {
            name: "עריכת עמוד",
            action: () => toggleVer(true)
        }
    ]

    return (
        <Fragment>
            <div className="page-item">
                <div className="block-title" 
                onMouseLeave={() => toggleMenu(false)}>
                    <span className="page-title">{page.name}</span>
                    <div className="page-menu">
                        <i className="material-icons"
                        onClick={() => toggleMenu(!displayMenu)}>more_vert</i>
                        <DropdownMenu
                        display={displayMenu}
                        toggleMenu={toggleMenu}
                        options={options} />
                    </div>
                </div>

                <div className="block-content">
                    {subpages.length !== 0
                    ?   subpages.map(subpage => (
                            <SubpageItem
                            pageId={page._id}
                            subpage={subpage} />
                        ))
                
                    :   <p className="no-resource-error">
                            עדיין אין דפים
                        </p>} 
                </div>
            </div>
            <Modal
            display={displayAdd}
            toggleModal={toggleAdd}
            title={"הוסף דף"}>
                <AddSubPage 
                pageId={page._id} />
            </Modal>

            <Modal
            display={displayEdit}
            toggleModal={toggleEdit}
            title="עריכת עמוד">
                <EditPage
                page={page} />
            </Modal>  

            <VerifyDelete 
            callback={deletePage}
            values={[page._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </Fragment>
    )
}

PageItem.propTypes = {
    subpages: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired
}

export default PageItem
