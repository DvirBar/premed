import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import DropdownMenu from '../../common/DropdownMenu';
import EditPage from './EditPage';
import VerifyDelete from '../../common/VerifyDelete';
import { deletePage } from '../../../redux/actions/pages';
import Section from '../../common/Section';
import Topics from '../topics/Topics';

function PageItem({ page }) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false)
    
    const toggleMenu = (toggle, event) => {
        if(event) {
            event.stopPropagation()
        }
        
        setDisplayMenu(toggle)
        
    }

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleVer = toggle => {
        setDisplayVer(toggle)
    }

    const options = [
        {
            name: "עריכת עמוד",
            action: () => toggleEdit(true)
        },
        {
            name: "מחיקת עמוד",
            action: () => toggleVer(true)
        }
    ]

    return (
        <Fragment>
            <Section className="page-item">
                <Section.Title>
                    <span className="page-title">
                        {page.name}
                    </span>
                </Section.Title>
                <Section.Header>
                    <i className="material-icons page-menu"
                    onClick={event => toggleMenu(!displayMenu, event)}>
                        more_vert
                    </i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </Section.Header>
                <Section.Body>
                    <Topics page={page} />
                </Section.Body>
            </Section>
            <EditPage
            page={page}
            display={displayEdit}
            toggleModal={toggleEdit} />
           

            <VerifyDelete 
            callback={deletePage}
            values={[page._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </Fragment>
    )
}

PageItem.propTypes = {
    page: PropTypes.object.isRequired
}

export default PageItem
