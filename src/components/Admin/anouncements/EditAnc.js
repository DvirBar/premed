import React, { useState, useEffect } from 'react';
import { editAnc } from '../../../redux/actions/anouncements';
import useForm from '../../../forms/useForm';
import PropTypes from 'prop-types';
import Dropdown from '../../common/Dropdown';
import FormInput from '../../common/FormInput';
import TextArea from '../../common/TextArea';
import Modal from '../../layout/Modal';

function EditAnc({ groups, anc, display, toggleModal}) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            title: anc.title,
            content: anc.content,
            groupId: anc.group._id 
        })
    }, [anc])

    const options = groups.map(group => ({
        name: group.name,
        value: group._id
    }))

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        initValues
    } = useForm(editAnc, defaultValues, anc._id)

    useEffect(() => {
        console.log(display);
    }, [display])
    

    return (
        <Modal 
        display={display} 
        toggleModal={toggleModal}
        title="עריכת פרסום">
            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                type="text"
                name="title" 
                label="כותרת"
                value={values.title}
                onChange={handleChange}
                error={errors.title} />

                <TextArea
                rows="10" cols="80"
                name="content" 
                placeholder="תוכן"
                value={values.content}
                onChange={handleChange}
                error={errors.content} />
                
                <Dropdown 
                options={options}
                defaultOption={options.find(option => 
                    option.value === anc.group._id)}
                name="groupId"
                title="קבוצה"
                onChange={handleChange} />

                <button
                type="submit">עריכה</button>
            </form>
        </Modal>
    )
}

EditAnc.propTypes = {
    anc: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    display: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default EditAnc
