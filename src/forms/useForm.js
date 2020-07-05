import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import validateForm from './formValidator';

const useForm = callback => {
    const dispatch = useDispatch();
    const [ values, setValues ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    useEffect(() => {
        // If there are no errors and the form was submitted
        if(Object.keys(errors).length === 0 && isSubmitting)
            dispatch(callback(values))
    }, [errors])

    const handleSubmit = event => {
        if(event)
            event.preventDefault();
        
        setErrors(validateForm(values)); 
        setIsSubmitting(true);
    }

    const handleChange = event => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
 }

 export default useForm;