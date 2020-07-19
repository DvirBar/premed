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

    return (
        <Modal display={display} setDisplay={setDisplay} title={"אישור מחיקה"}>
            אתה בטוח שאתה רוצה למחוק?

            <button onClick={commitCallback}>מחק</button>
            <button onClick={() => setDisplay(false)}>ביטול</button>
        </Modal>
    )
}

export default VerifyDelete;
