import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addQuestGroup } from '../../../redux/actions/questgroups';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';

function AddQuestionGroup({ pathId }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: '',
            pathId
        })
    }, [pathId])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addQuestGroup, defaultValues)
    
    
    const [display, setDisplay] = useState(false)

    const toggleDisplay = open => {
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
            toggleModal={toggleDisplay}
            title='הוספת קבוצה'>
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
                        יצירה
                    </button>
                </form>
            </Modal>
        </Fragment>
        
    )
}

AddQuestionGroup.propTypes = {
    pathId: PropTypes.string.isRequired
}

export default AddQuestionGroup
