import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addQuestGroup } from '../../../redux/questions/actions';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';
import { useParams } from 'react-router';
import ChoosePaths from '../../forms/ChoosePaths/ChoosePaths';

function AddQuestionGroup() {
    const [defaultValues, setDefaultValues] = useState({})

    const { pathId } = useParams()

    useEffect(() => {
        setDefaultValues({
            name: '',
            pathIds: []
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

    console.log(values);

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
                    
                    <ChoosePaths 
                    values={values}
                    handleChange={handleChange} />

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
