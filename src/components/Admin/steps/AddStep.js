import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import { addStep } from '../../../redux/actions/steps';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';

function AddStep({ path, steps }) {
    const [defaultValues, setDefaultValues] = useState({})
    const [displayModal, setDisplayModal] = useState(false)
    const [parentOptions, setParentOptions] = useState([])
    const [siblings, setSiblings] = useState([])
    const [prevOptions, setPrevOptions] = useState([])

    const title = "יצירת שלב עבור " + path.name;

    const toggleModal = open => {
        setDisplayModal(open)
    }

    // Form
    useEffect(() => {
        setDefaultValues ({
            name: '',
            pathId: path.value
        }) 
    }, [path])

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        initValues
    } = useForm(addStep, defaultValues)

    // Init values and errors when switching path
    useEffect(() => {
        initValues()
    }, [defaultValues, path])


    //// Parent
    // Dropdown options
    useEffect(() => {
        setParentOptions([{name: 'ללא שיוך', value: undefined}, ...steps.map(step => ({
            name: step.name,
            value: step._id
        }))])
    }, [steps])

    //// Prev 
        // Get siblings
    useEffect(() => {
        if(values) 
            setSiblings(steps.filter(step => 
            step.parent === values.parentId))
    }, [values.parentId, steps]) 

        // Dropdown options
    useEffect(() => {
        if(siblings.length !== 0)
            setPrevOptions([{name: 'ללא', value: undefined}, ...siblings.map(step => ({
                name: step.name,
                value: step._id
            }))])
        }, [siblings])
       
    useEffect(() => {
        console.log(values);
    }, [values])

    return (
        <Fragment>
            <div className="add-step">
                <button onClick={() => toggleModal(true)}>+ שלב חדש</button>
            </div>
            <Modal 
            display={displayModal} 
            toggleModal={toggleModal}
            title={title}>
                <form onSubmit={handleSubmit} noValidate>
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
                        defaultOption={parentOptions[0]}
                        name="parentId"
                        title="שייך ל"
                        onChange={handleChange}
                        />
                    }
                        
                    {prevOptions.length !== 0 && 
                        <Dropdown
                        options={prevOptions}
                        defaultOption={prevOptions[0]}
                        name="prevId"
                        title="שלב קודם"
                        onChange={handleChange}
                        />
                    }
                  
                    <button type="submit">יצירה</button>
                </form>
            </Modal>
        </Fragment>
    )
}

AddStep.propTypes = {
    path: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
}

export default AddStep
