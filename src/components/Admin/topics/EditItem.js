import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { editItem, deleteItem } from '../../../redux/actions/topics';
import { Link } from 'react-router-dom';
import FormInput from '../../common/FormInput';
import Modal from '../../layout/Modal';
import VerifyDelete from '../../common/VerifyDelete';

function EditItem({ displayModal, toggleModal, topicId, item }) {
    const [displayVer, setDisplayVer] = useState(false)
    const [defaultValues, setDefaultValues] = useState({
        name: item.name,
        content: item.content,
        link: item.link
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editItem, defaultValues, topicId, item._id)

    const toggleVer = open => {
        setDisplayVer(open)
    }

    return (
        <Modal
        display={displayModal}
        toggleModal={toggleModal}
        title={"ערוך חומר"}>
            <form onSubmit={handleSubmit}>
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
                
                <div className="drive-link">
                    <FormInput
                    label={"קישור"}
                    type={"text"}
                    name={"link"}
                    value={values.link}
                    onChange={handleChange}
                    error={errors.link} />

                    {values.link && values.link !== 0 &&
                        <a 
                        href={values.link} 
                        target="_blank"
                        rel="noopener noreferrer">בדוק קישור</a>
                    }   
                </div>

                <div className="form-buttons">
                    <button
                    className="info" 
                    type="submit">עדכן</button>
                    <button 
                    className="danger"
                    onClick={() => toggleVer(true)}>מחק</button>
                </div>
            </form>
            <VerifyDelete
            callback={deleteItem}
            values={[topicId, item._id]}
            display={displayVer}
            toggleModal={toggleVer} />
        </Modal>
    )
}

export default EditItem
