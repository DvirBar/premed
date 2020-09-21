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
    const [error, setErrors] = useState('');
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
        console.log("sending");
        if(!error && isSubmitting) {
            const dataObj = {
                field: name,
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

    const addData = () => {
        if(value && value.length !== 0) {
            setIsSubmitting(true)
            setErrors(validateForm(value, fieldValids))
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
                onChange={addData} />
    }

    else if(type === "checkbox") {
        return <Checkbox 
                name={name}
                label={title}
                onChange={addData}
                value={{on: true, off: false}}
                checked={defValue ? true : false} />
    }

    else {
        return <Fragment></Fragment>
    }
}

export default MatchFormFragment
