import React, { useEffect, useState } from 'react'
import useForm from '../../../../../../forms/useForm'
import { editUserDataPaths } from '../../../../../../redux/actions/userdata'
import Modal from '../../../../../layout/Modal'
import ChoosePaths from '../../ChoosePaths/ChoosePaths'

function EditPaths({ userPaths, display, toggleModal, tableId }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            pathIds: userPaths?.map(path => path._id)
        })
    }, [userPaths])

    const {
        handleChange,
        handleSubmit,
        values
    } = useForm(editUserDataPaths, defaultValues, tableId)

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title="עריכת מסלולים">
            <form 
            className="edit-user-data-paths" 
            onSubmit={handleSubmit}>
                <ChoosePaths 
                name="pathIds"
                selPaths={values.pathIds}
                onChange={handleChange} />

                <button
                disabled={values.pathIds?.length === 0}
                type="submit">
                    שמירה
                </button>
            </form>
            
        </Modal>
    )
}

export default EditPaths
