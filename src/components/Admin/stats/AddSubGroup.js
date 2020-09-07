import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addDataGroup } from '../../../redux/actions/datagroups';
import FormInput from '../../common/FormInput';
import Modal from '../../layout/Modal';

function AddSubGroup({ parentGroup, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: '',
            pathId: parentGroup.path,
            parentId: parentGroup._id
        })
    }, [parentGroup])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addDataGroup, defaultValues)

    useEffect(() => {
        console.log(display);
    }, [display])
        
    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={"הוסף קבוצת נתונים ל" + parentGroup.name}>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <button type="submit">הוסף</button>
            </form>
        </Modal>
    )
}

export default AddSubGroup
