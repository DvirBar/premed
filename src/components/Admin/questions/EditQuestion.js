import React, { useEffect, useState } from 'react';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import { editQuest } from '../../../redux/questions/actions'

function EditQuestion({ groupId, question, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({ 
            question: question.question,
            answer: question.answer,
            sourceLink: question.sourceLink
         })
    }, [question])
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editQuest, defaultValues, groupId, question._id)

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title='עריכת שאלה'>
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
                onChange={handleChange}
                placeholder="תשובה"
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
                    עריכה
                </button>
            </form>
        </Modal>
    )
}

export default EditQuestion
