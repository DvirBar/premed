import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../layout/Modal';
import useForm from '../../../../../forms/useForm';
import { addStep } from '../../../../../redux/actions/steps';
import FormInput from '../../../../common/FormInput';
import Dropdown from '../../../../common/Dropdown';
import CheckBox from '../../../../common/Checkbox';
import useSortSteps from './useSortSteps';

function AddStep({ 
    pathId, 
    uniIds, 
    steps, 
    display, 
    toggleDisplay }) {
    const [defaultValues, setDefaultValues] = useState()

    useEffect(() => {
        setDefaultValues({
            name: '',
            isFinal: false,
            pathId,
            uniIds
        })
    }, [pathId, uniIds])

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(addStep, defaultValues)

    const {
        parents,
        prevSteps 
    } = useSortSteps(steps, 'add', values.parentId)
    
    return (
        <Fragment>
            <button
            onClick={() => toggleDisplay(true)}>
                שלב חדש
            </button>

            <Modal
            display={display}
            toggleModal={toggleDisplay}
            title='הוספת שלב'>
                <form onSubmit={handleSubmit}>
                    <FormInput
                    label="שם"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name} />

                    {parents?.length > 0 &&
                        <Dropdown
                        options={parents}
                        name="parentId"
                        title="שלב מכיל"
                        onChange={handleChange}
                        placeholder="בחירה" />                                    
                    } 

                    {prevSteps?.length > 0 &&
                        <Dropdown
                        options={prevSteps}
                        name="prevId"
                        title="שלב קודם"
                        onChange={handleChange}
                        placeholder="בחירה" />                                    
                    }

                    <CheckBox
                    name="isFinal"
                    label="שלב סופי"
                    onChange={handleChange}
                    checked={values.isFinal} />

                    <button type="submit"> 
                        הוספה
                    </button>
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
