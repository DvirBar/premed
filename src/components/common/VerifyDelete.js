import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Modal from '../layout/Modal';

function VerifyDelete({ callback, value, display, toggleModal }) {
    const dispatch = useDispatch()

    const commitCallback = () => {
        dispatch(callback(value));
        toggleModal(false);
    }

    const buttonStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }

    return (
        <Modal 
        style={buttonStyle}
        display={display} 
        toggleModal={toggleModal}
        title={"אישור מחיקה"}>
            <p>אתה בטוח שאתה רוצה למחוק?</p>
            <p className="modal-buttons">
                <button 
                style={{display: "inline-block"}}
                className="danger"
                onClick={commitCallback}>מחק</button>

                <button 
                style={{display: "inline-block"}}
                onClick={() => toggleModal(false)}>ביטול</button>
            </p>
        </Modal>
    )
}

VerifyDelete.propTypes ={
    callback: PropTypes.func.isRequired,
    values: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default VerifyDelete;
