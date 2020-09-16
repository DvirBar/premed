import React from 'react';
import Modal from '../../../layout/Modal';

function CalcDetails({ display, toggleModal, storedCalc }) {
    const typesDict = {
        "field": "שדה נתונים",
        "group": "קבוצת נתונים",
        "calc": "שקלול"
    }

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={"פירוט הפרמטרים"}>
            {storedCalc.args.map(arg =>
                <div className="arg-item">
                    <span>
                        {arg.name}
                    </span>
                    <span className="arg-type">
                        {typesDict[arg.type]}
                    </span>
                </div>)}
        </Modal>
    )
}

export default CalcDetails
