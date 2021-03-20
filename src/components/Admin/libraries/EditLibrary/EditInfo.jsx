import React, { useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useForm from '../../../../forms/useForm';
import { editLibrary } from '../../../../redux/libraries/actions';

function EditInfo({ lib }) {
    const [defaultValues, setDefaultValues] = useState({
        ...lib
    })

    const {
        handleChange,
        handleSubmit,
        values
    } = useForm(editLibrary, defaultValues, lib._id)

    const changeContent = (data, event) => {
        if(event.preventDefault) {
            event.preventDefault()
        }
        
        handleChange({
            name: 'info',
            value: data
        })
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
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
                changeContent(editor.getData(), event)
            }} />

            <button type="submit">
                שמירה
            </button>
        </form>
    )
}

export default EditInfo
