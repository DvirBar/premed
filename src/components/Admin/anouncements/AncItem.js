import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DropdownMenu from '../../common/DropdownMenu';
import VerifyDelete from '../../common/VerifyDelete';
import Modal from '../../layout/Modal';
import { deleteAnc } from '../../../redux/actions/anouncements';
import EditAnc from './EditAnc';

function AncItem(props) {
    const anc = props.anc;
    const groups = props.groups;
    const [showIcon, setShowIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [showVerifyDelete, setShowVerifyDelete] = useState(false);
    const [editMode, setEditMode] = useState(false)

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <div 
        className="anc-item"
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}>
            <p className="anc-title">
                <h4>{anc.title}</h4>
                {showIcon && 
                    <i 
                    className="material-icons"
                    onClick={() => setShowMenu(!showMenu)}
                    >more_vert</i>
                }
            </p>
            <p className="anc-date">{moment(anc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")}</p>
            <p className="anc-content">{anc.content}</p>

            {/* <DropdownMenu show={showMenu} setShow={setShowMenu}>
                <li onClick={() => toggleModal(true)}>ערוך פרסום</li>
                <li onClick={() => setShowVerifyDelete(true)}>מחק פרסום</li>
            </DropdownMenu> */}

            <VerifyDelete 
                display={showVerifyDelete} 
                setDisplay={setShowVerifyDelete}
                callback={deleteAnc}
                values={[anc._id]}
                />
        
                <EditAnc 
                anc={anc} 
                groups={groups}
                display={displayModal}
                toggleModal={toggleModal} /> 
        </div>
    )
}

AncItem.propTypes = {
    anc: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
}

export default AncItem
