import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addItem } from '../../../redux/actions/topics';
import FormInput from '../../common/FormInput';
import Modal from '../../layout/Modal';

function AddItem({ topic }) {
    const [displayModal, setDisplayModal] = useState(false)
    const [defaultValues, setDefaultValues] = useState({
        name: '',
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addItem, defaultValues, topic._id)

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <Fragment>
            <button
            onClick={() => setDisplayModal(true)}>
                הוסף חומר
            </button>
            <Modal 
            display={displayModal} 
            toggleModal={toggleModal} 
            title={"הוסף חומר"}>
                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                    label={"שם"}
                    type={"text"}
                    name={"name"}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name} />

                    <textarea
                    name="content"
                    cols="40" rows="5"
                    value={values.content}
                    onChange={handleChange}
                    error={errors.content}
                    placeholder="תוכן" />
                    
                    <FormInput
                    label={"קישור"}
                    type={"text"}
                    name={"link"}
                    value={values.link}
                    onChange={handleChange}
                    error={errors.link} />

                    <button type="submit">צור</button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default AddItem
