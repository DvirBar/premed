import React, { useContext, useEffect, useState } from 'react'
import useForm from '../../../../forms/useForm'
import { editStep } from '../../../../redux/actions/steps'
import { StepsContext } from '../../../steps/StepsContext'
import useSortSteps from '../StepsContent/AddSteps/useSortSteps'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Modal from '../../../layout/Modal'
import { useSelector } from 'react-redux'
import { getStepById, stepsSelector } from '../../../../redux/selectors/steps'
import FormInput from '../../../common/FormInput'
import Dropdown from '../../../common/Dropdown'
import DeleteStep from './DeleteStep'
import EditUniContent from './EditUniContent'
import{ arrayToObject } from '../../../../utils/objects'

function EditStep({ display, toggleDisplay }) {
    const steps = useSelector(stepsSelector)

    const {
        selStep
    } = useContext(StepsContext)


    const [defaultValues, setDefaultValues] = useState()


    useEffect(() => {
        setDefaultValues({
            name: selStep.name,
            parentId: selStep.parent,
            prevId: selStep.prev,
            genContent: selStep.genContent || '',
            uniContent: arrayToObject(selStep.uniData || [], 'uni')
        })
    }, [selStep])

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(editStep, defaultValues, selStep._id)

    const {
        parents,
        prevSteps 
    } = useSortSteps(
        steps, 
        'edit', 
        values.parentId, 
        selStep?._id)

    const changeContent = data => {
        handleChange({
            name: 'genContent',
            value: data
        })
    }

    const parentStep = useSelector(getStepById(values.parentId))
    const prevStep = useSelector(getStepById(values.prevId))

    return (
        <Modal
        display={display}
        toggleModal={toggleDisplay}
        title='עריכת שלב'>
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
                    defaultOption={parentStep}
                    name="parentId"
                    title="שלב מכיל"
                    onChange={handleChange}
                    placeholder="בחירה" />                                    
                } 

                {prevSteps?.length > 0 &&
                    <Dropdown
                    options={prevSteps}
                    defaultOption={prevStep}
                    name="prevId"
                    title="שלב קודם"
                    onChange={handleChange}
                    placeholder="בחירה" />                                    
                }

                <CKEditor
                editor={ ClassicEditor }
                config={{
                    language: {
                        ui: 'he',
                        content: 'he'
                    }
                }}
                data={values.genContent}
                onChange={ (event, editor) => {
                    changeContent(editor.getData())
                }} />

                {values.uniContent &&
                    <EditUniContent
                    uniContent={values.uniContent}
                    handleChange={handleChange} />
                }
                
                <button type="submit"> 
                    עריכה
                </button>
            </form>
            <DeleteStep
            stepId={selStep._id} />
        </Modal>
    )
}

export default EditStep
