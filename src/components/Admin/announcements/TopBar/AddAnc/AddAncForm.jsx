import React, { useState } from 'react'
import Modal from '../../../../layout/Modal'
import useForm from '../../../../../forms/useForm'
import { addAnc } from '../../../../../redux/announcements/ancs/actions'
import FormInput from '../../../../common/FormInput'
import Editor from '../../../../common/forms/Editor/Editor'
import Dropdown from '../../../../common/Dropdown'
import { useSelector } from 'react-redux'
import Checkbox from '../../../../common/Checkbox'
import { getGroups } from '../../../../../redux/announcements/groups/selectors'

function AddAncForm({ display, setDisplay }) {
    const [defaultValues, setDefaultValues] = useState({
        title: '',
        group: ''
    })

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addAnc, defaultValues)

    const groups = useSelector(getGroups)
    const options = groups.map(group => ({
        name: group.name,
        value: group._id
    }))

    return (
        <Modal
        display={display}
        toggleModal={setDisplay}
        title="פרסום חדש">
            <form onSubmit={handleSubmit}>
                <FormInput
                name="title"
                type="text"
                label="כותרת"
                value={values.title}
                onChange={handleChange}
                error={errors.title} />

                <Editor
                value={values.content}
                onChange={handleChange}
                name="content" />

                <Dropdown 
                options={options}
                name="group"
                onChange={handleChange}
                placeholder="בחירה"
                title="קבוצה" />

                <Checkbox
                label="שליחת מייל"
                name="shouldEmail"
                onChange={handleChange}
                checked={values.shouldEmail} />

                <button type="submit">
                    שליחה
                </button>
            </form>
        </Modal>
    )
}

export default AddAncForm
