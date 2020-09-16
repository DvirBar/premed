import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../../forms/useForm';
import { editCalc } from '../../../../redux/actions/calculations';
import FormInput from '../../../common/FormInput';
import Dropdown from '../../../common/Dropdown';
import Modal from '../../../layout/Modal';
import Checkbox from '../../../common/Checkbox';

function EditCalc({ display, toggleModal, calc, storedCalcs }) {
    const [defaultValues, setDefaultValues] = useState({});

    // Init form values
    useEffect(() => {
        setDefaultValues({
            name: calc.name,
            storedCalcId: calc.calc,
            isSuggestion: calc.isSuggestion
        })
    }, [calc])

    const {
        handleChange,
        handleSubmit,
        values,
        errors
    } = useForm(editCalc, defaultValues, calc._id)

    // Map stored calculations options
    const [storedCalcOptions, setStoredCalcOptions] = useState([])

    useEffect(() => {
        let tempCalcs = storedCalcs?.filter(storCalc => 
                storCalc.university === values.uni)
    
        setStoredCalcOptions(tempCalcs?.map(calc => ({
            name: calc.name,
            value: calc.id
        })))
    }, [storedCalcs, values])


    return (
        <Modal
        display={display}
        toggleModal={toggleModal}
        title={"עריכת שקלול"}>

            <form onSubmit={handleSubmit}>
                <FormInput 
                label="שם"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={errors.name} />

                {storedCalcOptions?.length !== 0 &&
                    <Dropdown
                    options={storedCalcOptions}
                    name="storedCalcId"
                    title="שקלול"
                    onChange={handleChange}
                    defaultOption={storedCalcOptions.find(storCalc => 
                        storCalc.value === values.storedCalcId)} />
                }

                <Checkbox
                name="isSuggestion"
                label="סימון כהצעה"
                value={{
                    on: true, 
                    off: false}}
                checked={values.isSuggestion}
                onChange={handleChange} />

                <button type="submit">עריכה</button>
            </form>
        </Modal>
    )
}

EditCalc.propTypes = {
    display: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    calc: PropTypes.object.isRequired,
    storedCalcs: PropTypes.array.isRequired
}

export default EditCalc
