import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addDataField } from '../../../redux/actions/datafields';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';

function AddDataField({ path, groups, fieldTypes }) {
    const [displayModal, setDisplayModal] = useState(false)
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: '',
            fieldType: '',
            pathId: path.value
        })
    }, [path])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addDataField, defaultValues)

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

    const toggleModal = open => {
        setDisplayModal(open)
    }

    return (
        <Fragment>
            <button onClick={() => toggleModal(true)}>
                הוסף שדה
            </button>
            <Modal
            display={displayModal}
            toggleModal={toggleModal}
            title={"הוסף שדה נתונים"}>

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
                        placeholder={{name:"בחר"}}
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

                    <button type="submit">הוסף</button>
                </form>
            </Modal>
        </Fragment>
    )
}

export default AddDataField
