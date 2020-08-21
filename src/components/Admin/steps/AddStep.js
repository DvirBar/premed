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
    const [selParent, setSelParent] = useState({})
    const [siblings, setSiblings] = useState([])
    const [prevOptions, setPrevOptions] = useState([])
    const [selPrev, setSelPrev] = useState({})

    const title = "צור שלב עבור " + path.name;

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
        if(selParent)
            setSiblings(steps.filter(step => 
            step.parent === selParent.value))
    }, [selParent, steps]) 

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
        console.log(values);
    }, [values])

    return (
        <Fragment>
            <div className="add-step">
                <button onClick={() => toggleModal(true)}>+ הוסף שלב</button>
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
                  
                    <button type="submit">צור שלב</button>
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
