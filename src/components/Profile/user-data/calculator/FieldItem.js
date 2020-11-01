import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { insertDataSimulation } from '../../../../redux/actions/userdata';
import Dropdown from '../../../common/Dropdown';
import FormInputBorder from '../../../common/FormInputBorder'

function FieldItem({ field, defValue, disabled }) {
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const [isChanging, setIsChanging] = useState(false)
    useEffect(() => {
        setValue(defValue)
    }, [defValue])

    const changeData = e => {
        setValue(e.target
            ? e.target.value
            : e.value)

        if(field.fieldType !== 'textbox')
            setIsChanging(true)
    }

    const dispatch = useDispatch()

    // Populate data in reducer on field blur
    const populateData = () => {
        if(value !== defValue && value !== '') {
            dispatch(insertDataSimulation(field, value))
        }

        if(value === '') {
            setValue(defValue)
        }
    }

    useEffect(() => {
        // If field type is not textbox, populate data on value change
        if(field.fieldType !== 'textbox' && isChanging) {
            populateData()
        }
    }, [value, isChanging])

    const [options, setOptions] = useState([])

    useEffect(() => {
        if(field.fieldType === 'select') {
            setOptions(field.fieldOptions.map(option => ({
                name: option,
                value: option
            })))
        }
    }, [field])

    switch(field.fieldType) {
        case 'textbox': 
            return  <FormInputBorder 
                    title={field.name}
                    name={field._id}
                    value={value}
                    onChange={changeData}
                    onBlur={populateData}
                    disabled={disabled ? true : false}
                    error={error?.length !== 0 && error} />
 
                       
        case 'select': 
            return  <Dropdown 
                    title={field.name}
                    options={options}
                    placeholder="בחירה"
                    defaultOption={options.find(option => 
                        option.value === value)}
                    name={field._id}
                    width='10rem'
                    onChange={changeData} />  
    }
}

export default FieldItem
