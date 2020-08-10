import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../layout/Modal';

const VerifyDelete = props => {
    const dispatch = useDispatch()
    const callback = props.callback;
    const [display, setDisplay] = [props.display, props.setDisplay]

    const commitCallback = () => {
        dispatch(callback(...props.values));
        setDisplay(false);
    }

    const toggleModal = open => {
        setDisplay(open)
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
                onClick={() => setDisplay(false)}>ביטול</button>
            </p>
        </Modal>
    )
}

export default VerifyDelete;
