import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../../forms/useForm';
import { addCalc } from '../../../../redux/actions/calculations';
import FormInput from '../../../common/FormInput';
import Dropdown from '../../../common/Dropdown';
import Modal from '../../../layout/Modal';
import Checkbox from '../../../common/Checkbox';
 
function AddCalc({ path, unis, storedCalcs }) {
    const [displayModal, setDisplayModal] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});

    // Init form values
    useEffect(() => {
        setDefaultValues({
            name: '',
            pathId: path.value,
            storedCalcId: '',
            isSuggestion: false
        })
    }, [path]) 

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(addCalc, defaultValues)

    // Map university options
    const [uniOptions, setUniOptions] = useState([])

    useEffect(() => {
        if(unis.length !== 0) {
            setUniOptions([{name: 'ללא', value: undefined}, 
                ...unis?.map(uni => ({
                name: uni.name,
                value: uni._id
            }))])
        }
    }, [unis])

    
    // Map stored calculations options
    const [storedCalcOptions, setStoredCalcOptions] = useState([])

    useEffect(() => {
        let tempCalcs = storedCalcs?.filter(calc => 
                calc.university === values.uni)
    
        setStoredCalcOptions(tempCalcs?.map(calc => ({
            name: calc.name,
            value: calc.id
        })))
    }, [storedCalcs, values.uni])


   
    const toggleModal = open => {
        setDisplayModal(open)
    }

    useEffect(() => {
        console.log(values);
    }, [values])

    // const toggleIsSuggestion = event => {
    //     handleChange
    //     console.log(event.target.value);
    // }

    return (
        <Fragment>
        <button onClick={() => toggleModal(true)}>
            יצירת שקלול
        </button>
        <Modal
        display={displayModal}
        toggleModal={toggleModal}
        title={"יצירת שקלול"}>

            <form onSubmit={handleSubmit}>
                <FormInput 
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                {uniOptions?.length !== 0 &&
                    <Dropdown
                    options={uniOptions}
                    name="uniId"
                    placeholder={{name:"בחר"}}
                    title="אוניברסיטה"
                    onChange={handleChange} />
                }

                {storedCalcOptions?.length !== 0 &&
                    <Dropdown
                    options={storedCalcOptions}
                    name="storedCalcId"
                    placeholder={{name:"בחר"}}
                    title="שקלול"
                    onChange={handleChange} />
                }

                <Checkbox
                name="isSuggestion"
                label="סימון כהצעה"
                value={{
                    on: true, 
                    off: false}}
                checked={values.isSuggestion}
                onChange={handleChange} />
    
                <button type="submit">צור</button>
            </form>
        </Modal>
    </Fragment>

    )
}

export default AddCalc
