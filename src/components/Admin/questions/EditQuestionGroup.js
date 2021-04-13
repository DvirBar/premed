import React, { useEffect, useState } from 'react';
import useForm from '../../../forms/useForm';
import { editQuestGroup } from '../../../redux/questions/actions';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';

function EditQuestionGroup({ group }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: group.name,
            readmore: group.read_more
        })
    }, [group])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editQuestGroup, defaultValues)
    
    
    const [display, setDisplay] = useState(false)

    const toggleDisplay = open => {
        setDisplay(open)
    }

    return (
        <Modal
        display={display}
        toggleModal={toggleDisplay}
        title='עריכת קבוצה'>
            <form onSubmit={handleSubmit}>
                <FormInput
                name="name"
                label="שם"
                type="text"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <div className="url-details">     
                    <input 
                    type="text" 
                    className="form-default"
                    name="readmore"
                    onChange={handleChange}
                    value={values.readmore}
                    placeholder="מידע נוסף" />

                    {values.readmore &&
                        <a 
                        href={values.readmore} 
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

export default EditQuestionGroup
