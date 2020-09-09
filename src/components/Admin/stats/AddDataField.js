import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addDataField } from '../../../redux/actions/datafields';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';
import FieldOptionsList from './data-fields/FieldOptionsList';

function AddDataField({ path, types, unis }) {
    const [displayModal, setDisplayModal] = useState(false)
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: '',
            fieldType: '',
            dataType: '',
            pathId: path.value
        })
    }, [path])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addDataField, defaultValues)

    const fieldTypes = types?.fieldTypes;
    const [fieldTypeOptions, setFieldTypeOptions] = useState([]);
    const dataTypes = types?.dataTypes;
    const [dataTypeOptions, setDataTypeOptions] = useState([]);
    const [uniOptions, setUniOptions] = useState([])
        
    useEffect(() => {
        if(fieldTypes && fieldTypes.length !== 0) {
            setFieldTypeOptions(fieldTypes.map(type => ({
                name: type.name,
                value: type.value
            })))
        }
    }, [fieldTypes])  

    useEffect(() => {
        if(dataTypes && dataTypes.length !== 0) {
            setDataTypeOptions(dataTypes.map(type => ({
                name: type.name,
                value: type.value
            })))
        }
    }, [dataTypes])  


    useEffect(() => {
        const filtPaths = unis.filter(uni => 
            uni.paths.find(curPath => curPath._id === path.value))

        setUniOptions([{name: 'ללא', value: undefined},
        ...filtPaths.map(uni => ({
            name: uni.name,
            value: uni._id
        }))])
    }, [unis, path])
    
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

                <form 
                className="add-data-field"
                onSubmit={handleSubmit}
                onKeyPress={e => e.key === "Enter" && e.preventDefault()}>
                    <div>
                        <FormInput 
                        label="שם"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name} />

                        {fieldTypeOptions.length !== 0 &&
                            <Dropdown
                            options={fieldTypeOptions}
                            name="fieldType"
                            placeholder={{name:"בחר"}}
                            title="סוג שדה"
                            onChange={handleChange} />
                        }

                        {dataTypeOptions.length !== 0 && 
                        values.fieldType &&
                        values.fieldType !== 'checkbox' &&
                            <Dropdown
                            options={dataTypeOptions}
                            name="dataType"
                            placeholder={{name:"בחר"}}
                            title="סוג נתונים"
                            onChange={handleChange} />
                        }   

                        {path.value && uniOptions.length !== 0 &&
                            <Dropdown
                            options={uniOptions}
                            name="uniId"
                            title="אוניברסיטה"
                            onChange={handleChange} />
                        }

                        <button type="submit">הוסף</button>
                    </div>

                    {values.fieldType === 'select' &&
                        <div>
                            <FieldOptionsList
                            onChange={handleChange}
                            values={values.fieldOptions}
                            name="fieldOptions" />
                        </div>
                    }
                </form>
            </Modal>
        </Fragment>
    )
}

AddDataField.propTypes = {
    path: PropTypes.object.isRequired,
    groups: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired
}

export default AddDataField
