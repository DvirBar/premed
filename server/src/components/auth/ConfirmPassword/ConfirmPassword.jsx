import React, { useState } from 'react'
import FormInput from '../../common/FormInput'

function ConfirmPassword({ 
    values,
    errors, 
    passwordName,
    passwordLabel,
    matchFail,
    handleChange }) {

    const [genError, setGenError] = useState('')

    if(matchFail && !genError) {
        setGenError('הסיסמאות לא זהות')
    }

    if(!matchFail && genError) {
        setGenError('')
    }
//
    return (
        <div className="confirm-password">
            <FormInput
            type="password"
            label={passwordLabel}
            name={passwordName}
            value={values[passwordName]}
            onChange={handleChange}
            error={errors[passwordName]} />

            <FormInput
            type="password"
            label="אישור סיסמה"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword} />

            <div className="confirm-password__error">
                {genError}
            </div>
        </div>
    )
}

export default ConfirmPassword
