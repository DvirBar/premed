import React, { useState } from 'react'
import Modal from '../../../layout/Modal'
import FormInput from '../../../common/FormInput'
import Checkbox from '../../../common/Checkbox'
import useForm from '../../../../forms/useForm'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as he from '@ckeditor/ckeditor5-build-classic/build/translations/he.js';
import { addLibrary } from '../../../../redux/libraries/actions'
import { useSelector } from 'react-redux'
import { getAllPaths } from '../../../../redux/selectors/paths'
import Dropdown from '../../../common/Dropdown'
import { getAllLibraries } from '../../../../redux/libraries/selectors'

function AddLibraryForm({ display, toggleDisplay }) {
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        pathIds: []
    })

    // Selectors
    const paths = useSelector(getAllPaths)
    const libs = useSelector(getAllLibraries)
    const libsOptions = [
        {
            name: "ללא",
            value: undefined
        },
        ...libs.map(lib => ({
            name: lib.name,
            value: lib._id
        }))
    ]

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addLibrary, defaultValues)

    const changeContent = data => {
        handleChange({
            name: 'info',
            value: data
        })
    }

    return (
        <Modal
        display={display}
        toggleModal={toggleDisplay}
        title="ספרייה חדשה">
            <form onSubmit={handleSubmit} noValidate>
                <FormInput
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                {paths.map(path => 
                    <div>
                        <Checkbox 
                        label={path.name}
                        name="pathIds"
                        value={path._id}
                        onChange={handleChange}
                        isMulti={true}
                        checked={values.pathIds?.find(pathId =>
                            pathId === path._id)
                            ? true : false}
                        />      
                    </div>)}

                <CKEditor
                editor={ ClassicEditor }
                config={{
                    language: {
                        ui: 'he',
                        content: 'he'
                    }
                }}
                data={values.info}
                onChange={ (event, editor) => {
                    changeContent(editor.getData())
                }} />

                {libsOptions.length > 0 && 
                    <Dropdown
                    options={libsOptions}
                    title="ספריית אב"
                    placeholder="בחר"
                    name="parentId"
                    onChange={handleChange} />
                }

                <button type="submit">
                    יצירה
                </button>
            </form>
        </Modal>
    )
}

export default AddLibraryForm
