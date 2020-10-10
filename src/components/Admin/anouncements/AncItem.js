import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DropdownMenu from '../../common/DropdownMenu';
import VerifyDelete from '../../common/VerifyDelete';
import Modal from '../../layout/Modal';
import { deleteAnc } from '../../../redux/actions/anouncements';
import EditAnc from './EditAnc';

function AncItem({ anc, groups }) {
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    const toggleDelete =  (toggle, event) => {
        if(event) {
            event.stopPropagation()
        }
        setDisplayDelete(toggle)
    }

    return (
        <Fragment>
            <div 
            className="anc-item"
            onClick={() => toggleEdit(true)}>
                <div className="anc-title">
                    <h4>{anc.title}</h4> 
                    <i 
                    className="material-icons"
                    onClick={e => toggleDelete(true, e)}>
                        delete
                    </i>
                </div>
                <p className="anc-date">
                    {moment(anc.date).format("פורסם ביום dddd ה-D בMMMM, YYYY")}
                </p>
                <p className="anc-content">
                    {anc.content}
                </p>
            </div>

            <VerifyDelete 
            display={displayDelete} 
            toggleModal={toggleDelete}
            callback={deleteAnc}
            values={[anc._id]} />
        
            <EditAnc 
            anc={anc} 
            groups={groups}
            display={displayEdit}
            toggleModal={toggleEdit} /> 
        </Fragment>
    )
}

AncItem.propTypes = {
    anc: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired
}

export default AncItem
