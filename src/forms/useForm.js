import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import validateForm from './formValidator';

const useForm = (callback, defaultValues, ...params) => {
    const dispatch = useDispatch();
    const [ values, setValues ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false)

    useEffect(() => {
        if(defaultValues)
            setValues(defaultValues)
    }, [defaultValues])

    useEffect(() => {
        // If there are no errors and the form was submitted
        if(Object.keys(errors).length === 0 && isSubmitting)
            dispatch(callback(...params, values))

        // If there are errors cancel submit
        if(errors)
            setIsSubmitting(false)
    }, [errors])

    const handleSubmit = event => {
        if(event)
            event.preventDefault();
        
        setIsSubmitting(true);
        setErrors(validateForm(values)); 
    }

    const handleChange = event => {

        // If not custom field
        if(event.target) {
            if(typeof event.persist !== "undefined")
                event.persist();

            if(event.target.type === 'checkbox') {
                const { name, value } = event.target;
                const valArr = values[name]

                if(!valArr.find(val => val === value))
                    setValues(values => ({...values,
                    [name]: [...valArr, value]}))
                
                else
                    setValues(values => ({...values,
                    [name]: [...valArr.filter(val =>
                        val !== value)]}))    
            }
            else {
                setValues(values => ({...values, 
                    [event.target.name]: event.target.value}));
            }
        }

        // If custom field
        else {
            if(event.type === 'multiValue') {
                const name = event.name;
                const value = event.value;
                let valArr = values[name];
                 
                if(!valArr)
                    valArr = []

                if(typeof value === 'object') {
                    if(event.action === 'add') {
                        setValues(values => ({
                            ...values,
                            [name]: [...valArr, value]
                        }))
                    }

                    else if(event.action === 'remove') {
                        setValues(values => ({
                            ...values,
                            [name]: values.filter(value =>
                                value[event.unique] !== event.value.value)
                        }))
                    }
                }
                
                else {
                    // If value does not exist in array, add it
                    if(!valArr.find(val => val === value))
                    setValues(values => ({...values,
                    [name]: [...valArr, value]}))
            
                    // If value exists in array, remove it 
                    else
                        setValues(values => ({...values,
                        [name]: [...valArr.filter(val =>
                            val !== value)]}))    
                }
                
            }
            else {  
                setValues(values => ({...values, [event.name]: event.value}));
            }
        }
    }

    const initValues = initValues => {
        if(!isSubmitting) 
            if(!initValues) {
                setValues(defaultValues);
                setErrors({})
            }
            
            // else {
                // setValues(
                //     Object.keys(values).map(keyName => {
                //         if(initValues.includes(keyName))
                //             return values[keyName] = defaultValues[keyName]

                //         return values[keyName]
                //     }))

                // setErrors({
                //     ...Object.keys(values).map(keyName => (
                //     initValues.includes(keyName)
                //     ? delete errors[keyName] 
                //     : errors[keyName]
                // ))})
            // }
        } 

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        initValues
    }
 }

 export default useForm;