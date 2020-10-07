import React, { useState, Fragment } from 'react';
import useForm from '../../../../forms/useForm';
import { addTable } from '../../../../redux/actions/datatables';
import FormInput from '../../../common/FormInput';
import Modal from '../../../layout/Modal';

function AddTable() {
    const [defaultValues, setDefaultValues] = useState({
        name: ''
    });
    const [display, setDisplay] = useState(false);

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addTable, defaultValues)

    const toggleModal = open => {
        setDisplay(open)
    }



    return (
        <Fragment>
            <i 
            className="material-icons add-float"
            onClick={() => setDisplay(true)}>
                add
            </i>
            <Modal
            display={display}
            toggleModal={toggleModal}
            title='יצירת טבלה'>
                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                    label="שם"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name} />

                    <div className="url-details">     
                        <input 
                        type="text" 
                        className="form-default"
                        name="tableUrl"
                        onChange={handleChange}
                        value={values.tableUrl}
                        placeholder="כתובת" />

                        {values.tableUrl &&
                            <a 
                            href={values.tableUrl} 
                            target="_blank"
                            rel="noopener noreferrer">בדיקת קישור</a>
                        }               
                    </div>
                
                    <button type="submit">יצירה</button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default AddTable
