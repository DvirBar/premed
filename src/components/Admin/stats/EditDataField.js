import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { editDataField } from '../../../redux/actions/datafields';
import Modal from '../../layout/Modal';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';

function EditDataField({ display, toggleModal, field, fieldTypes, groups }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: field.name,
            fieldType: field.fieldType,
            pathId: field.path,
            groupId: field.group
        })
    }, [field])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editDataField, defaultValues, field._id)

    const [typeOptions, setTypeOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
        
    useEffect(() => {
        if(fieldTypes && fieldTypes.length !== 0) 
            setTypeOptions(fieldTypes.map(type => ({
                name: type.name,
                value: type.value
            })))
    }, [fieldTypes])  

    useEffect(() => {
        setGroupOptions(groups.map(group => ({
            name: group.name,
            value: group._id
        })))
    }, [groups]) 

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title="ערוך שדה">
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                {typeOptions.length !== 0 &&
                    <Dropdown
                    options={typeOptions}
                    name="fieldType"
                    defaultOption={fieldTypes.find(type => 
                        type.value === field.fieldType)}
                    title="סוג שדה"
                    onChange={handleChange} />
                }

                {groupOptions.length !== 0 &&
                    <Dropdown
                    options={groupOptions}
                    name="groupId"
                    title="קבוצת נתונים"
                    onChange={handleChange} />
                }

                <button type="submit">ערוך</button>
            </form>
        </Modal>
    )
}

export default EditDataField
