import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from '../../common/DropdownMenu';
import EditLink from './EditLink';
import VerifyDelete from '../../common/VerifyDelete';
import { deleteSubpageLink } from '../../../redux/actions/pages';

function LinkItem({ link, subpageId, pageId}) {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayVer, setDisplayVer] = useState(false);

    const toggleMenu = open => {
        setDisplayMenu(open)
    }

    const toggleEdit = open => {
        setDisplayEdit(open)
    }

    const toggleVer = open => {
        setDisplayVer(open)
    }

    const options = [
        {
            name: "ערוך קישור",
            action: () => toggleEdit(true)
        },
        {
            name: "מחק קישור",
            action: () => toggleVer(true)
        }
    ]

    return (
        <Fragment>
            <li className="link-item">
                <a 
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer">{link.name}</a>
                <div className="link-menu">
                    <i className="material-icons"
                    onClick={() => toggleMenu(!displayMenu)}>more_vert</i>
                    <DropdownMenu
                    display={displayMenu}
                    toggleMenu={toggleMenu}
                    options={options} />
                </div> 
            </li>

            <EditLink 
            link={link}
            subpageId={subpageId}
            pageId={pageId}
            display={displayEdit}
            toggleModal={toggleEdit} />

            <VerifyDelete 
            callback={deleteSubpageLink}
            values={[pageId, subpageId, link._id]}
            display={displayVer}
            toggleModal={toggleVer} />

        </Fragment>
    )
}

LinkItem.propTypes = {
    link: PropTypes.object.isRequired,
    subpageId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired
}

export default LinkItem
