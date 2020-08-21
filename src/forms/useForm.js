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

        // If there are no errors cancel submit
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
        if(event.target) {
            if(typeof event.persist !== "undefined")
                event.persist();

            setValues(values => ({...values, [event.target.name]: event.target.value}));
        }
        else {
            setValues(values => ({...values, [event.name]: event.value}));
        }
    }

    const initValues = () => {
        if(!isSubmitting) {
            setValues(defaultValues);
            setErrors({});
        }
            
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