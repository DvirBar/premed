import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { editStep } from '../../../redux/actions/steps';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as he from '@ckeditor/ckeditor5-build-classic/build/translations/he.js';

function EditStep({ selStep, steps }) {
    const stepId = selStep._id
    const [defaultValues, setDefaultValues] = useState({})
    const [parentOptions, setParentOptions] = useState([])
    const [selParent, setSelParent] = useState({})
    const [siblings, setSiblings] = useState([])
    const [prevOptions, setPrevOptions] = useState([])
    const [selPrev, setSelPrev] = useState({})


    // Form
    useEffect(() => {
        setDefaultValues({
            name: selStep.name,
            parentId: selStep.parent || undefined,
            prevId: selStep.prev || undefined,
            content: selStep.content || undefined
        })
    }, [selStep, steps])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editStep, defaultValues, stepId)


    //// Parent
        // Dropdown options
    useEffect(() => {
        const filtSteps = steps.filter(step => step._id !== stepId)

        setParentOptions([{name: 'ללא שיוך', value: undefined}, ...filtSteps.map(step => ({
            name: step.name,
            value: step._id
        }))])
    }, [steps])

    //// Prev 
        // Get siblings
    useEffect(() => {
        if(selParent){
             // Get all steps that have the same parent and are not the step itself
             setSiblings(steps.filter(step => 
                step.parent === selParent.value && step._id !== stepId))
        } 
    }, [selParent, steps, values, selStep]) 

        // Dropdown options
    useEffect(() => {
        if(siblings.length !== 0)
            setPrevOptions([{name: 'ללא', value: undefined}, ...siblings.map(step => ({
                name: step.name,
                value: step._id
            }))])
        }, [siblings])


    
    const changeContent = data => {
        handleChange({
            name: 'content',
            value: data
        })
    }
    
    useEffect(() => {
        console.log(values);
    }, [values])
    return (
        <form className="edit-step" onSubmit={handleSubmit} noValidate>
            <FormInput
            type="text"
            label="שם"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name} />

            {parentOptions.length !== 0 &&
                <Dropdown
                options={parentOptions}
                defaultOption={parentOptions.find(option => 
                    values.parentId === option.value)}
                name={"parentId"}
                title={"שייך ל"}
                onChange={handleChange}
                />
            }

            {prevOptions.length !== 0 &&
                <Dropdown
                options={prevOptions}
                defaultOption={prevOptions.find(option => 
                    values.prevId === option.value)}
                name={"prevId"}
                title={"שלב קודם"}
                onChange={handleChange}
                />
            }

            <CKEditor
            editor={ ClassicEditor }
            config={{
                language: {
                    ui: 'he',
                    content: 'he'
                }
            }}
            data={values.content}
            onChange={ (event, editor) => {
                changeContent(editor.getData())
            }} />
         
            <button 
            className="info"
            type="submit">עדכן</button>
        </form>
    )
}

EditStep.propTypes = {
    selStep: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
}



export default EditStep
