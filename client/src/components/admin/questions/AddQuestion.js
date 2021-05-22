import React, { useState } from 'react';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import { addQuest } from '../../../redux/questions/actions';
import Editor from '../../common/forms/Editor/Editor';

function AddQuestion({ group }) {
    const [defaultValues] = useState({
        question: '',
        answer: ''
    })
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addQuest, defaultValues, group?._id)
    
    const [display, setDisplay] = useState(false)

    return (
        <div>
            <button onClick={() => setDisplay(true)}>
                שאלה חדשה
            </button>
            <Modal
            display={display}
            toggleModal={setDisplay}
            title='הוספת שאלה'>
                <form onSubmit={handleSubmit}>
                    <FormInput
                    label="שאלה"
                    type="text"
                    name="question"
                    value={values.question}
                    onChange={handleChange}
                    error={errors.question} />
                    
                    {display &&
                        <Editor
                        value={values.answer}
                        onChange={handleChange}
                        name="answer" />                        
                    }

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
        </div>
    )
}

export default AddQuestion
