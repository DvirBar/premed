import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import useForm from '../../../../../forms/useForm'
import { changePassword } from '../../../../../redux/actions/auth'
import { CHANGE_PASSWORD } from '../../../../../redux/auth/types'
import { isLoading } from '../../../../../redux/loader/selectors'
import ConfirmPassword from '../../../../auth/ConfirmPassword/ConfirmPassword'
import Button from '../../../../common/buttons/Button/Button'
import FormInput from '../../../../common/FormInput'

function ChangePassword() {
    const [defaultValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        validateForm,
        setErrors
    } = useForm(changePassword, defaultValues)

    const [matchFail, setMatchFail] = useState(false)

    const submitForm = event => {
        event.preventDefault()
        const stagedErrors = validateForm(values)

        if(Object.keys(stagedErrors).length === 0) {
            if(values.newPassword === values.confirmPassword) {
                setMatchFail(false)
                handleSubmit(event)
            }
    
            else {
                setMatchFail(true)
            }
        }
        
        else {
            setErrors(stagedErrors)
        }
    }

    const loading = useSelector(isLoading(CHANGE_PASSWORD))

    const handlePasswordChange = event => {
        if(!event.target.value || event.target.value.length <= 64) {
            handleChange(event)
        }
    }
    
    return (
        <form 
        onSubmit={submitForm}
        className="edit-user-details changePassword">
            <div className="edit-user-details__title">
                שינוי סיסמה
            </div>

            <FormInput
            type="password"
            label="סיסמה נוכחית"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handlePasswordChange}
            error={errors.oldPassword} />

            <ConfirmPassword
            values={values}
            errors={errors}
            handleChange={handlePasswordChange}
            matchFail={matchFail}
            passwordName='newPassword'
            passwordLabel='סיסמה חדשה' />

            <Button 
            label="שינוי"
            type="submit"
            loading={loading} />
        </form>
    )
}

export default ChangePassword
