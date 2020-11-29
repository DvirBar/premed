import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FormInputBorder from '../../common/FormInputBorder';
import { insertData } from '../../../redux/actions/userdata';
import Dropdown from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import validateForm from '../../../forms/userDataValidation';
import { getFieldVal, selTableSelector } from '../../../redux/selectors/userdata';


function MatchFormFragment({ field, groupId, isCalc, fieldType, defValue, disabled }) {
    const {
        _id,
        name, 
        fieldOptions,
        validators
    } = field

    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setValue(defValue);
    }, [defValue]);

    const selTable = useSelector(selTableSelector)

    useEffect(() => {
        if((!error || error.length === 0) && isSubmitting) {
            const dataObj = {
                fieldId: _id,
                groupId,
                isCalc,
                value
            }
            dispatch(insertData(selTable, dataObj))
            setIsSubmitting(false)
            setError('')
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
        if(fieldType !== 'textbox') {
            addData()
        }
    }, [value])
 
    const addData = () => {
        if(value && value.length !== 0 && value !== defValue) {
            setIsSubmitting(true)
            if(validators.length !== 0) {
                setError(validateForm(value, validators))
            }
                
            
            else {
                setError(undefined)
            }
        }

        if(error && error.length !== 0 && value === defValue) {
            setError('')
        }

        if(value?.length === 0) {
            setError('')
        }
    }
    
    switch(fieldType) {
        case 'textbox': 
            return <div>
                        <FormInputBorder 
                        title={name}
                        name={_id}
                        value={value}
                        onChange={changeData}
                        onBlur={addData}
                        error={error?.length !== 0 ? error : undefined}
                        disabled={disabled} />
                    </div>

        case 'select': 
            return <div>
                        <Dropdown 
                        title={name}
                        options={fieldOptions}
                        defaultOption={fieldOptions.find(option => 
                            option.value === defValue)}
                        placeholder="בחירה"
                        name={_id}
                        width='10rem'
                        onChange={changeData} /> 
                   </div>
                  
        
        case 'checkbox': 
            return <div>
                        <Checkbox 
                        name={_id}
                        label={name}
                        onChange={changeData}
                        value={{on: true, off: false}}
                        checked={defValue ? true : false} />
                   </div>
                    
        
        default:
            return <Fragment></Fragment>
    }
}

export default MatchFormFragment
