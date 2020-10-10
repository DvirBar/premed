import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addAnc } from '../../../redux/actions/anouncements';
import Modal from '../../layout/Modal';
import Dropdown from '../../common/Dropdown';
import FormInput from '../../common/FormInput';
import TextArea from '../../common/TextArea';

function AddAnc({ groups }) {
    const [defaultValues, setDefaultValues] = useState({
        title: '',
        content: '',
        groupId: undefined
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addAnc, defaultValues)

    
    const [options, setOptions] = useState([])
    useEffect(() => {
        setOptions(groups.map(group => ({
            name: group.name,
            value: group._id
        })))
    }, [groups])


    const [displayModal, setDisplayModal] = useState(false);
    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <Fragment>
            <button 
            onClick={() => toggleModal(true)}>פרסום</button>
            <Modal 
            display={displayModal} 
            toggleModal={toggleModal}
            title="פרסום חדש">
                <form onSubmit={handleSubmit} noValidate>

                    <FormInput
                    type="text"
                    label="כותרת"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    error={errors.title} />

                    <TextArea
                    cols="80" rows="10"
                    placeholder="תוכן הפרסום"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    error={errors.content} />
                    
                    <Dropdown 
                    options={options}
                    name="groupId"
                    title="קבוצת פרסום"
                    placeholder="בחירה"
                    onChange={handleChange} />
                    <button type="submit">יצירה</button>
                </form>
            </Modal>
        </Fragment>
    )
}

AddAnc.propTypes = {
    groups: PropTypes.array.isRequired
}

export default AddAnc
