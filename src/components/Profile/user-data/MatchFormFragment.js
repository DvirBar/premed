import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FormInputBorder from '../../common/FormInputBorder';
import { insertData } from '../../../redux/actions/userdata';
import Dropdown from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import validateForm from '../../../forms/userDataValidation';


function MatchFormFragment({ title, name, defValue, type, fieldOptions, fieldValids }) {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setValue(defValue);
    }, [defValue]);

    useEffect(() => {
        setOptions(fieldOptions.map(option => ({
                name: option,
                value: option
            })))
    }, [fieldOptions])

    useEffect(() => {
        if((!error || error.length === 0) && isSubmitting) {
            const dataObj = {
                fieldId: name,
                value
            }
            dispatch(insertData(dataObj))
        }

        if(error) 
            setIsSubmitting(false)
    }, [error])

    const changeData = event => {
        setValue(event.target 
            ? event.target.value
            : event.value)
    }

    useEffect(() => {
        if(type !== 'textbox') {
            addData()
        }
    }, [value])
 
    const addData = () => {
        if(value && value.length !== 0 && value !== defValue) {
            setIsSubmitting(true)
            setError(validateForm(value, fieldValids))
        }

        if(error && error.length !== 0 && value === defValue) {
            setError('')
        }

        if(value?.length === 0) {
            setError('')
        }
    }

    if(type === "textbox") {
        return <FormInputBorder 
                title={title}
                type={type}
                name={name}
                value={value}
                onChange={changeData}
                onBlur={addData}
                error={error?.length !== 0 ? error : undefined} />
    }

    else if(type === "select") {
        return <Dropdown 
                title={title}
                options={options}
                defaultOption={options.find(option => 
                    option.value === defValue)}
                placeholder="בחירה"
                name={name}
                width={'10rem'}
                onChange={changeData} />
    }

    else if(type === "checkbox") {
        return <Checkbox 
                name={name}
                label={title}
                onChange={changeData}
                value={{on: true, off: false}}
                checked={defValue ? true : false} />
    }

    else {
        return <Fragment></Fragment>
    }
}

export default MatchFormFragment
