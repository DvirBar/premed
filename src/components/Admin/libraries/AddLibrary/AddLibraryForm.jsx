import React, { useState } from 'react'
import Modal from '../../../layout/Modal'
import useForm from '../../../../forms/useForm'

function AddLibraryForm({ display, toggleDisplay }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        pathIds: []
    })
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm()
    
    return (
        <Modal
        display={display}
        toggleModal={toggleDisplay}
        title="ספרייה חדשה">
            
        </Modal>
    )
}

export default AddLibraryForm
