import React, { Fragment, useContext, useEffect } from 'react'
import validateForm from '../../../../../forms/userDataValidation'
import { checkObjectKeys, isObjEmpty } from '../../../../../utils/objects'
import BorderTextbox from '../../../../common/BorderTextbox'
import { FieldOptionsContext } from '../FieldOptionsContext'

function NumFilters({ min, max }) {
    const {
        field,
        minVal,
        maxVal,
        error,
        changeMinVal,
        changeMaxVal,
        changeError
    } = useContext(FieldOptionsContext)

    useEffect(() => {
        changeMinVal(min)
        changeMaxVal(max)
    }, [min, max])


    /* Change value when typed, only allow typing
     if value is a number. */
    const handleChange = (event, callback) => {
        const val = event.target.value
        
        if(!isNaN(val)) {
            callback(val)
        }
    }

    // Validate value on blur. display error if exists.
    const validateFilterValue = (value, type) => {
        if(value && value !== '') {
            changeError({
                ...error,
                [type]: validateForm(value, field.validators)
            })
        }
        
        if(value === '')
            changeError({
                ...error,
                [type]: undefined
            }) 
    }

    const validateGenError = () => {
        if(checkObjectKeys(error, ['genError']) || 
           isObjEmpty(error) || error) {
            if(maxVal !== '' && minVal !== '' && maxVal <= minVal) {
                changeError({ genError: 'הערך המינימלי חייב להיות קטן מהמקסימלי' })
            }

            else if(error.genError) {
                changeError({})
            }
        }
    }

     // Check that min is smaller than max
    useEffect(() => {
        validateGenError()
    }, [minVal, maxVal])

    return (
        <Fragment>

            <BorderTextbox
            type="text" 
            value={minVal}
            onChange={e => handleChange(e, changeMinVal)}
            onBlur={() => validateFilterValue(minVal, 'min')}
            placeholder="גדול מ-"
            error={error.min} />

            <BorderTextbox
            type="text" 
            value={maxVal}
            onChange={e => handleChange(e, changeMaxVal)}
            onBlur={() => validateFilterValue(maxVal, 'max')}
            placeholder="קטן מ-"
            error={error.max} />

            <div className="general-error">
                {error.genError}
            </div>
        </Fragment>
    )
}

export default NumFilters
