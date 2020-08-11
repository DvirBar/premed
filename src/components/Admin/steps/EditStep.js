import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { editStep } from '../../../redux/actions/steps';
import useForm from '../../../forms/useForm';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';

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
    }, [selStep])

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

        // Selected option
    useEffect(() => { // Binds the values to selected option
        const parent = values.parentId

        if(parent) {
            const option = parentOptions.find(option => 
                option.value === parent)

            setSelParent({
                name: option.name,
                value: parent
            })}
        // if selected parent is undefined
        else
            setSelParent(parentOptions[0])
    }, [values, parentOptions])


    //// Prev 
        // Get siblings
    useEffect(() => {
        if(selParent){
             // Get all steps that have the same parent and are not the step itself
             setSiblings(steps.filter(step => 
                step.parent === selParent.value && step._id !== stepId))
        } 
    }, [selParent, steps, values]) 

        // Dropdown options
    useEffect(() => {
        if(siblings.length !== 0)
            setPrevOptions([{name: 'ללא', value: undefined}, ...siblings.map(step => ({
                name: step.name,
                value: step._id
            }))])
        }, [siblings])

        // Selected option
        useEffect(() => { // Binds the values to selected option
            const prev = values.prevId
    
            if(prev) {
                const option = prevOptions.find(option => 
                    option.value === prev)
    
                setSelPrev({
                    name: option.name,
                    value: prev
                })}
            // if selected prev is undefined
            else
                setSelPrev(prevOptions[0])
        }, [values, prevOptions])
        useEffect(() => {
            console.log(values)
        }, [values])
        
    return (
        <form className="edit-step" onSubmit={handleSubmit}>
            <FormInput
            type="text"
            label="שם"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name} />

            {parentOptions.length !== 0 && selParent &&
                <Dropdown
                selected={selParent}
                options={parentOptions}
                name={"parentId"}
                title={"שייך ל"}
                onChange={handleChange}
                />
            }

            {siblings.length !== 0 && selPrev && 
                <Dropdown
                selected={selPrev}
                options={prevOptions}
                name={"prevId"}
                title={"שלב קודם"}
                onChange={handleChange}
                />
            }
        
            <textarea 
            cols="80" rows="20"
            name="content"
            value={values.content || ''}
            onChange={handleChange} />
            
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
