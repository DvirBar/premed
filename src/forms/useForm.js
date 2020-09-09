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
                const name = event.target.name;
                const value = event.target.value;
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
                let valArr = values[name]

                if(!valArr)
                    valArr = []

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
            else {  
                setValues(values => ({...values, [event.name]: event.value}));
            }
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