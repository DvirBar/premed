import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import FormInputBorder from '../../common/FormInputBorder';
import Dropdown from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import validateForm from '../../../forms/userDataValidation';
import { selTableSelector } from '../../../redux/selectors/userdata';
import ToggleSwitch from '../../common/ToggleSwitch';
import { GroupsContext } from './data-block/GroupsContext';
import DatePicker from '../../common/DatePicker';

function MatchFormFragment({ 
    field, 
    groupId, 
    isCalc, 
    fieldType, 
    defValue, 
    disabled,
    cusGroupParent
}) {
    const {
        _id,
        name, 
        fieldOptions,
        validators
    } = field

    const {
        commitOnChange
    } = useContext(GroupsContext)
    
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
                cusGroupParent,
                value
            }
            commitOnChange(dataObj, selTable)
            setIsSubmitting(false)
            setError('')
        }

        if(error) 
            setIsSubmitting(false)
    }, [error])

    const changeData = event => {
        const value = event.target 
        ? event.target.value
        : event.value 
            ?   event.value
            :   event

        setValue(value)
    }

    useEffect(() => {
        if(fieldType !== 'textbox') {
            addData()
        }
    }, [value])
 
    const addData = () => {
        if(value && value.length !== 0 && value !== defValue) {
            setIsSubmitting(true)
            if(validators && validators.length !== 0) {
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
                        disabled={disabled}
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
                    
        case 'toggle':
            return <div className="switch-block">
                        {name &&
                            <span className="switch-name">
                                {name}
                            </span>
                        }
                        <ToggleSwitch
                        options={fieldOptions}
                        onChange={changeData}
                        value={defValue}
                        disabled={disabled}
                        className="indent" />
                   </div>  
                   
        case 'dateSelector':
            return <div>
                        <DatePicker
                        label={name}
                        name={_id}
                        value={new Date(defValue)}
                        onChange={changeData} />
                </div>

        default:
            return <Fragment></Fragment>
    }
}

export default MatchFormFragment
