import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import useForm from '../../../forms/useForm';
import { addStep } from '../../../redux/actions/steps';
import Dropdown from '../../common/Dropdown';

function AddStep({ path, steps }) {
    const [defaultValues, setDefaultValues] = useState({})
    const [selParent, setSelParent] = useState({})
    const [selPrev, setSelPrev] = useState({})
    const [displayModal, setDisplayModal] = useState(false)
    const [siblings, setSiblings] = useState([])
    const [parentOptions, setParentOptions] = useState([])
    const [prevOptions, setPrevOptions] = useState([])

    const title = "צור שלב עבור " + path.name;

    const toggleModal = open => {
        setDisplayModal(open)
    }

    // Set form
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
        errors
    } = useForm(addStep, defaultValues)


    // Get siblings on parent change - TODO: might need to move it upflow
    useEffect(() => { 
        setSiblings(steps.filter(step => step.parent === selParent.value))
    }, [selParent, steps]) 

    useEffect(() => { 
        if(siblings.length === 0 && steps.length !== 0)
            setSiblings(steps.filter(step => !step.parent))
    }, [steps, siblings]) 


    // Parents dropdown
    useEffect(() => {
    setParentOptions(steps.map(step => ({
        name: step.name,
        value: step._id
    })))
    }, [steps])

    const changeSelParent = (event, selectedName) => {
        console.log(event.target.value)
        handleChange(event);
        setSelParent({name: selectedName, value: event.target.value})
    }

    // Previous step dropdown
    useEffect(() => {
        setPrevOptions([{name: 'ללא', value: undefined}, ...siblings.map(sibling => ({
            name: sibling.name,
            value: sibling._id
        }))])
        }, [siblings])

    useEffect(() => {
        console.log(values)
    }, [values])

    
    const changeSelPrev = (event, selectedName) => {
        console.log(event.target.value)
        handleChange(event);
        setSelPrev({name: selectedName, value: event.target.value})
    }

    return (
        <Fragment>
            <div className="add-step">
                <button onClick={() => toggleModal(true)}>+ הוסף שלב</button>
            </div>
            <Modal 
            display={displayModal} 
            toggleModal={toggleModal}
            title={title}
            >
                <form onSubmit={handleSubmit} noValidate>
                    <input 
                    type="text"
                    name="name" 
                    placeholder="שם"
                    value={values.name || ''}
                    onChange={handleChange}
                    /><br />
                    <p className="form-error">
                        {errors.name && errors.name}
                    </p><br />

                    {steps.length !== 0 &&
                        <Fragment>
                            <Dropdown
                            selected={selParent}
                            options={parentOptions}
                            name={"parentId"}
                            title={"שייך ל"}
                            onChange={changeSelParent}
                            /><p className="form-error">
                            {errors.parent && errors.parent}
                            </p><br />
                        </Fragment>
                    }

                    {siblings.length !== 0 &&
                        <Fragment>
                            <Dropdown
                            selected={selPrev}
                            options={prevOptions}
                            name={"prevId"}
                            title={"ממשיך את השלב"}
                            onChange={changeSelPrev}
                            /><p className="form-error">
                            {errors.parent && errors.parent}
                            </p><br />
                        </Fragment>
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
