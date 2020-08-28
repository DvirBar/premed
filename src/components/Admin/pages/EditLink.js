import React, { useState } from 'react'
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';
import { editSubpageLink } from '../../../redux/actions/pages';

function EditLink({ link, subpageId, pageId, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({
        name: link.name,
        url: link.url
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editSubpageLink, defaultValues, pageId, subpageId, link._id)

    return (
        <Modal 
        display={display} 
        toggleModal={toggleModal} 
        title={"הוסף קישור"}>
            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                label={"שם"}
                type={"text"}
                name={"name"}
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                <div className="link-entry">
                    <FormInput
                    label={"קישור"}
                    type={"text"}
                    name={"url"}
                    value={values.url}
                    onChange={handleChange}
                    error={errors.url} />

                    {values.url &&
                        <a 
                        href={values.url} 
                        target="_blank"
                        rel="noopener noreferrer">בדוק קישור</a>
                    }   
                </div>
                <button type="submit">שמור</button>
            </form>
        </Modal>
    )
}

EditLink.propTypes = {
    link: PropTypes.object.isRequired,
    subpageId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default EditLink
