import React, { Fragment, useState, useEffect } from 'react'
import Modal from '../../layout/Modal';import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addUni } from '../../../redux/actions/universities';
import FormInput from '../../common/FormInput';
import ColorPicker from './ColorPicker';

function AddUni({ paths }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        pathIds: []
    });
    const [display, setDisplay] = useState(false);

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addUni, defaultValues)

    const toggleModal = open => {
        setDisplay(open)
    }


    return (
        <Fragment>
             <i 
            className="material-icons"
            onClick={() => toggleModal(true)}>
                add
            </i>
            <Modal
            display={display}
            toggleModal={toggleModal}
            title='הוסף אוניברסיטה'>
                <form 
                className="add-valid" 
                onSubmit={handleSubmit}>
                    <FormInput 
                    label="שם"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name} />

                    {paths?.map(path =>
                        <Fragment>
                            <input
                            type='checkbox'
                            name='pathIds'
                            onChange={handleChange}
                            value={path._id}
                            id={path._id} />
                            <label for={path._id}>{path.name}</label>
                        </Fragment> 
                        )}

                    <ColorPicker
                    onChange={handleChange}
                    selColor={values.color} />

                    
                    <button type="submit">הוסף</button>

                </form>
            </Modal>
        </Fragment>
    )
}

export default AddUni
