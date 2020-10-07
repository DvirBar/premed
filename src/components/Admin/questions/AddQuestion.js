import React, { useState } from 'react';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import { addQuest } from '../../../redux/actions/questgroups';

function AddQuestion({ group, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({
        question: '',
        answer: ''
    })
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addQuest, defaultValues, group._id)
    
    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title='הוספת שאלה'>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="שאלה"
                type="text"
                name="question"
                value={values.question}
                onChange={handleChange}
                error={errors.question} />

                <textarea
                cols="80" rows="10"
                name='answer'
                placeholder='תשובה'
                onChange={handleChange}
                value={values.answer} />

                <div className="url-details">     
                    <input 
                    type="text" 
                    className="form-default"
                    name="sourceLink"
                    onChange={handleChange}
                    value={values.sourceLink}
                    placeholder="מקור" />

                    {values.sourceLink &&
                        <a 
                        href={values.sourceLink} 
                        target="_blank"
                        rel="noopener noreferrer">בדיקת קישור</a>
                    }               
                </div>

                <button type="submit">
                    הוספה
                </button>
            </form>
        </Modal>
    )
}

export default AddQuestion
