import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addDataField } from '../../../redux/actions/datafields';
import FormInput from '../../common/FormInput';
import Dropdown from '../../common/Dropdown';
import Modal from '../../layout/Modal';
import FieldOptionsList from './data-fields/FieldOptionsList';

function AddFieldToGroup({ group, types, display, toggleModal }) {
    const [defaultValues, setDefaultValues] = useState({})

    useEffect(() => {
        setDefaultValues({
            name: '',
            fieldType: '',
            dataType: '',
            pathId: group.path,
            groupId: group._id
        })
    }, [group])

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

    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={"הוסף שדה נתונים ל" + group.name}>

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

                    {dataTypeOptions.length !== 0 &&
                        <Dropdown
                        options={dataTypeOptions}
                        name="dataType"
                        placeholder={{name:"בחר"}}
                        title="סוג נתונים"
                        onChange={handleChange} />
                    }   

                    {fieldTypeOptions.length !== 0 &&
                        <Dropdown
                        options={fieldTypeOptions}
                        name="fieldType"
                        placeholder={{name:"בחר"}}
                        title="סוג שדה"
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
    )
}

// AddDataField.propTypes = {
//     path: PropTypes.object.isRequired,
//     groups: PropTypes.array.isRequired,
//     types: PropTypes.array.isRequired
// }

export default AddFieldToGroup
