import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../forms/useForm';
import { addValid } from '../../../redux/actions/datafields';
import Modal from '../../layout/Modal';
import Dropdown from '../../common/Dropdown';

function AddValid({ field, validTypes }) {

    const [defaultValues, setDefaultValues] = useState({
        validType: ''
    });
    const [validOptions, setValidOptions] = useState([]);
    const [showMinMax, setShowMinMax] = useState(false);
    const [description, setDescription] = useState('');

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addValid, defaultValues, field._id)

    useEffect(() => {
        if(validTypes && validTypes.length !== 0) {
            // Filter validators that the field already has
            const filtValids = validTypes?.filter(type => 
                !field.validators?.find(valid =>
                    valid.validType === type.value))
    
            setValidOptions(filtValids.map(valid => ({
                name: valid.name,
                value: valid.value
            })))
        }
    }, [field, validTypes])

    const toggleMinMax = type => {
        if(type.value === 'numRange')
            setShowMinMax(true)
        
        else
            setShowMinMax(false)

        handleChange(type)
    }

    return (
        <form 
        className="add-valid" 
        onSubmit={handleSubmit}>
            <Dropdown
            options={validOptions}
            name='validType'
            title='סוג'
            onChange={toggleMinMax}
            placeholder={{name: 'בחר'}} />

            {showMinMax &&
                <Fragment>
                    <input 
                    type="text" 
                    className="short-box"
                    name="min"
                    onChange={handleChange}
                    placeholder='מינימום' />

                    <input
                    type="text"
                    className="short-box"
                    name="max"
                    onChange={handleChange}
                    placeholder='מקסימום' />
                </Fragment>
            }

            <button type="submit">הוסף</button>
        </form>
    )
}

export default AddValid
