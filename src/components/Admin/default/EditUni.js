import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import { editUni } from '../../../redux/actions/universities';
import FormInput from '../../common/FormInput';
import ColorPicker from './ColorPicker';

function EditUni({ display, toggleModal, uni }) {
    const [defaultValues, setDefaultValues] = useState({
        name: uni.name,
        pathIds: uni.paths.map(path => path._id),
        color: uni.color
    });
    const paths = useSelector(state => state.paths.paths)

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editUni, defaultValues, uni._id)


    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title="ערוך שדה">
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
                        checked={values?.pathIds?.find(id => 
                            id === path._id)
                        ? true : false}
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
    )
}

export default EditUni
