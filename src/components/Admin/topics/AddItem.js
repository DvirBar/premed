import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addItem } from '../../../redux/actions/topics';
import FormInput from '../../common/FormInput';
import Modal from '../../layout/Modal';
import IconsSelect from './IconsSelect';

function AddItem({ topic }) {
    const [displayModal, setDisplayModal] = useState(false);
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
            onClick={() => toggleModal(true)}>חומר חדש</button>
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

                    <IconsSelect 
                    value={values.icon || ''}
                    onChange={handleChange} />

                    <div className="drive-link">
                        <FormInput
                        label={"קישור"}
                        type={"text"}
                        name={"link"}
                        value={values.link}
                        onChange={handleChange}
                        error={errors.link} />

                        {values.link &&
                            <a 
                            href={values.link} 
                            target="_blank"
                            rel="noopener noreferrer">בדיקת קישור</a>
                        }   
                    </div>

                    <button type="submit">צור</button>
                </form>
            </Modal>
        </Fragment> 
    )
}

export default AddItem
